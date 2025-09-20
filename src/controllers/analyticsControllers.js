const { prisma } = require('../lib/prisma');
const { safeParseDate, anyInvalid, buildIndexedSeries } = require('../utils/dates');
const { computePct, mergeByIndex } = require('../utils/stats');

async function getPerformance(req, res) {
  try {
    const { start, end, compareStart, compareEnd } = req.query;

    if (!start || !end || !compareStart || !compareEnd) {
      console.warn('[getPerformance] missing params');
      return res.status(400).json({ message: 'Missing date range parameters' });
    }

    // Parseo y validación (ANTES de usar toISOString)
    const startDate     = safeParseDate(start);
    const endDate       = safeParseDate(end);
    const prevStartDate = safeParseDate(compareStart);
    const prevEndDate   = safeParseDate(compareEnd);


    if (anyInvalid(startDate, endDate, prevStartDate, prevEndDate)) {
      console.warn('[getPerformance] invalid dates after parse');
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Limites en ISO (con Z). OJO: en SQL los casteamos a ::timestamp (sin zona)
    const sIso  = startDate.toISOString();
    const eIso  = endDate.toISOString();
    const psIso = prevStartDate.toISOString();
    const peIso = prevEndDate.toISOString();

    // Filtros Prisma (coherentes con el test: [start, end))
    const curOrderWhere = {
      status: { in: ['PAID', 'COMPLETED'] },
      createdAt: { gte: startDate, lt: endDate },
    };
    const prevOrderWhere = {
      status: { in: ['PAID', 'COMPLETED'] },
      createdAt: { gte: prevStartDate, lt: prevEndDate },
    };


    // ---------- SUMMARY (Prisma) ----------
    const [sumCur, sumPrev, countCur, countPrev, prodCur, prodPrev] = await Promise.all([
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: curOrderWhere }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: prevOrderWhere }),
      prisma.order.count({ where: curOrderWhere }),
      prisma.order.count({ where: prevOrderWhere }),
      prisma.orderItem.aggregate({
        _sum: { quantity: true },
        where: { order: { is: curOrderWhere } },
      }),
      prisma.orderItem.aggregate({
        _sum: { quantity: true },
        where: { order: { is: prevOrderWhere } },
      }),
    ]);

    const totalSales   = Number(sumCur?._sum?.totalAmount ?? 0);
    const prevSales    = Number(sumPrev?._sum?.totalAmount ?? 0);
    const orders       = Number(countCur ?? 0);
    const prevOrders   = Number(countPrev ?? 0);
    const productsSold = Number(prodCur?._sum?.quantity ?? 0);
    const prevProducts = Number(prodPrev?._sum?.quantity ?? 0);

    // ---------- VARIATIONS (SQL)
    // Comparamos contra ::timestamp (SIN zona) para alinear con createdAt (timestamp)
    const rowsVarCur = await prisma.$queryRaw`
      SELECT COALESCE(SUM(
               CASE WHEN jsonb_typeof(oi."chosenOptions") = 'array'
                    THEN jsonb_array_length(oi."chosenOptions")
                    ELSE 0 END
             ),0)::int AS variations_cur
      FROM "OrderItem" oi
      JOIN "Order" o ON o.id = oi."orderId"
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${sIso}::timestamp
        AND o."createdAt" <  ${eIso}::timestamp;
    `;
    const rowsVarPrev = await prisma.$queryRaw`
      SELECT COALESCE(SUM(
               CASE WHEN jsonb_typeof(oi."chosenOptions") = 'array'
                    THEN jsonb_array_length(oi."chosenOptions")
                    ELSE 0 END
             ),0)::int AS variations_prev
      FROM "OrderItem" oi
      JOIN "Order" o ON o.id = oi."orderId"
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${psIso}::timestamp
        AND o."createdAt" <  ${peIso}::timestamp;
    `;
    const variationsSold = Number(rowsVarCur?.[0]?.variations_cur ?? 0);
    const prevVariations = Number(rowsVarPrev?.[0]?.variations_prev ?? 0);

    // ---------- TRENDS (SQL)
    // 1) Ejecuta las queries...
    const salesCur = await prisma.$queryRaw`
      SELECT date_trunc('day', o."createdAt")::date AS date,
             SUM(o."totalAmount") AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${sIso}::timestamp
        AND o."createdAt" <  ${eIso}::timestamp
      GROUP BY date
      ORDER BY date;
    `;
    const salesPrev = await prisma.$queryRaw`
      SELECT date_trunc('day', o."createdAt")::date AS date,
             SUM(o."totalAmount") AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${psIso}::timestamp
        AND o."createdAt" <  ${peIso}::timestamp
      GROUP BY date
      ORDER BY date;
    `;
    const ordersCurSeries = await prisma.$queryRaw`
      SELECT date_trunc('day', o."createdAt")::date AS date,
             COUNT(*) AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${sIso}::timestamp
        AND o."createdAt" <  ${eIso}::timestamp
      GROUP BY date
      ORDER BY date;
    `;
    const ordersPrevSeries = await prisma.$queryRaw`
      SELECT date_trunc('day', o."createdAt")::date AS date,
             COUNT(*) AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" >= ${psIso}::timestamp
        AND o."createdAt" <  ${peIso}::timestamp
      GROUP BY date
      ORDER BY date;
    `;

    // 3) Indexa a días y loguea también
    const salesCurIdx   = buildIndexedSeries(startDate,     endDate,     salesCur);
    const salesPrevIdx  = buildIndexedSeries(prevStartDate, prevEndDate, salesPrev);
    const ordersCurIdx  = buildIndexedSeries(startDate,     endDate,     ordersCurSeries);
    const ordersPrevIdx = buildIndexedSeries(prevStartDate, prevEndDate, ordersPrevSeries);

    const response = {
      totalSales: {
        current: totalSales,
        previous: prevSales,
        pctChange: computePct(totalSales, prevSales),
      },
      orders: {
        current: orders,
        previous: prevOrders,
        pctChange: computePct(orders, prevOrders),
      },
      productsSold: {
        current: productsSold,
        previous: prevProducts,
        pctChange: computePct(productsSold, prevProducts),
      },
      variationsSold: {
        current: variationsSold,
        previous: prevVariations,
        pctChange: computePct(variationsSold, prevVariations),
      },
      trends: {
        sales:  mergeByIndex(salesCurIdx,  salesPrevIdx),
        orders: mergeByIndex(ordersCurIdx, ordersPrevIdx),
      }
    };

    return res.json(response);
  } catch (err) {
    console.error('Error in getPerformance:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCategorySales(req, res) {
  try {
    const ALLOWED = new Set(['Day','Week','Month','6 Months','Year','All']);
    const period = ALLOWED.has(req.query.period) ? req.query.period : 'Day';

    const now = new Date();
    let start;

    switch (period) {
      case 'Week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'Month':
        start = new Date(now);
        start.setMonth(start.getMonth() - 1);
        break;
      case '6 Months':
        start = new Date(now);
        start.setMonth(start.getMonth() - 6);
        break;
      case 'Year':
        start = new Date(now);
        start.setFullYear(start.getFullYear() - 1);
        break;
      case 'All':
        start = new Date(0);
        break;
      case 'Day':
      default:
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // fin exclusivo
    const nowEx = new Date(now);

    // Filtros movidos al LEFT JOIN para mantener categorías sin ventas
    const rows = await prisma.$queryRaw`
      SELECT
        c.id,
        c.name,
       COALESCE(
          SUM(oi.quantity * oi.price)
            FILTER (WHERE o.status IN ('COMPLETED','PAID')
                    AND o."createdAt" >= ${start} AND o."createdAt" < ${nowEx}),
          0
        )::float AS sales,
        COALESCE(
          SUM(oi.quantity)
            FILTER (WHERE o.status IN ('COMPLETED','PAID')
                    AND o."createdAt" >= ${start} AND o."createdAt" < ${nowEx}),
          0
        )::int AS "itemsSold"
      FROM "Category" c
      LEFT JOIN "Product" p
        ON p."categoryId" = c.id
      LEFT JOIN "OrderItem" oi
        ON oi."productId" = p.id
      LEFT JOIN "Order" o
  ON o.id = oi."orderId"
      GROUP BY c.id, c.name
      ORDER BY sales DESC;
    `;

    const totalAll = rows.reduce((sum, r) => sum + Number(r.sales), 0);

    const categories = rows.map((r) => ({
      id:         r.id,
      name:       r.name,
      sales:      Number(Number(r.sales).toFixed(2)),
      itemsSold:  r.itemsSold,
      percentage: totalAll > 0
        ? Number(((Number(r.sales) / totalAll) * 100).toFixed(2))
        : 0,
    }));

    return res.json({
      period,
      totalAll: Number(totalAll.toFixed(2)),
      categories,
    });
  } catch (err) {
    console.error('Error in getCategorySales:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getDashboardStats(req, res) {
  try {

      const ALLOWED_PERIODS = new Set(['Day','Week','Month','6 Months','Year','All'])
    const period = ALLOWED_PERIODS.has(req.query.period) ? req.query.period : 'Day'
   const now = new Date()
    const nowEx = new Date(now) // límite superior exclusivo

    let currentStart, prevStart, prevEnd

    switch (period) {
      case 'Week':
        currentStart = new Date(now - 7 * 24 * 60 * 60 * 1000)
        prevStart    = new Date(now - 14 * 24 * 60 * 60 * 1000)
        prevEnd      = new Date(now - 7 * 24 * 60 * 60 * 1000)
        break
      case 'Month':
        currentStart = new Date(now); currentStart.setMonth(currentStart.getMonth() - 1)
        prevStart    = new Date(now); prevStart.setMonth(prevStart.getMonth() - 2)
        prevEnd      = new Date(now); prevEnd.setMonth(prevEnd.getMonth() - 1)
        break
      case '6 Months':
        currentStart = new Date(now); currentStart.setMonth(currentStart.getMonth() - 6)
        prevStart    = new Date(now); prevStart.setMonth(prevStart.getMonth() - 12)
        prevEnd      = new Date(now); prevEnd.setMonth(prevEnd.getMonth() - 6)
        break
      case 'Year':
        currentStart = new Date(now); currentStart.setFullYear(currentStart.getFullYear() - 1)
        prevStart    = new Date(now); prevStart.setFullYear(prevStart.getFullYear() - 2)
        prevEnd      = new Date(now); prevEnd.setFullYear(prevEnd.getFullYear() - 1)
        break
      case 'All':
        currentStart = new Date(0)
        prevStart    = new Date(0)
        prevEnd      = new Date(0)
        break
      case 'Day':
      default:
        currentStart = new Date(now - 24 * 60 * 60 * 1000)
        prevStart    = new Date(now - 2 * 24 * 60 * 60 * 1000)
        prevEnd      = new Date(now - 24 * 60 * 60 * 1000)
    }

    const [rowRaw] = await prisma.$queryRaw`
      SELECT
        /* Usuarios */
        (SELECT COUNT(*) FROM "User" u
           WHERE u.role = 'USER'
         AND u."createdAt" >= ${currentStart} AND u."createdAt" < ${nowEx}
        )::int AS "customers",
        (SELECT COUNT(*) FROM "User" u
           WHERE u.role = 'USER'
            AND u."createdAt" >= ${prevStart} AND u."createdAt" < ${prevEnd}
        )::int AS "customersPrev",

        /* Órdenes */
       (SELECT COUNT(DISTINCT o.id) FROM "Order" o
           WHERE o."createdAt" >= ${currentStart} AND o."createdAt" < ${nowEx}
        )::int AS "orders",
       (SELECT COUNT(DISTINCT o.id) FROM "Order" o
           WHERE o."createdAt" >= ${prevStart} AND o."createdAt" < ${prevEnd}
        )::int AS "ordersPrev",

        /* Ganancias */
        (SELECT COALESCE(SUM(o."totalAmount"),0) FROM "Order" o
              WHERE o.status IN ('COMPLETED','PAID')
            AND o."createdAt" >= ${currentStart} AND o."createdAt" < ${nowEx}
        )::float AS "earnings",
        (SELECT COALESCE(SUM(o."totalAmount"),0) FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
             AND o."createdAt" >= ${prevStart} AND o."createdAt" < ${prevEnd}
        )::float AS "earningsPrev",

        /* Productos vendidos */
        (SELECT COALESCE(SUM(oi.quantity),0) FROM "OrderItem" oi
                     JOIN "Order" o2 ON o2.id = oi."orderId"
           WHERE o2.status IN ('COMPLETED','PAID')
            AND o2."createdAt" >= ${currentStart} AND o2."createdAt" < ${nowEx}
        )::int AS "productsSold",
        (SELECT COALESCE(SUM(oi.quantity),0) FROM "OrderItem" oi
            JOIN "Order" o2 ON o2.id = oi."orderId"
           WHERE o2.status IN ('COMPLETED','PAID')
             AND o2."createdAt" >= ${prevStart} AND o2."createdAt" < ${prevEnd}
        )::int AS "productsSoldPrev",

        /* Baselines para 'All' */
        (SELECT COUNT(*) FROM "User" u2
           WHERE u2.role = 'USER'
             AND u2."createdAt" = (
               SELECT MIN(u3."createdAt") FROM "User" u3 WHERE u3.role = 'USER'
             )
        )::int AS "customersFirst",
        (SELECT COUNT(*) FROM "Order" o3
           WHERE o3."createdAt" = (
             SELECT MIN(o4."createdAt") FROM "Order" o4
           )
        )::int AS "ordersFirst",
        (SELECT COALESCE(SUM(o5."totalAmount"),0) FROM "Order" o5
           WHERE o5.status IN ('COMPLETED','PAID')
             AND o5."createdAt" = (
               SELECT MIN(o6."createdAt") FROM "Order" o6 WHERE o6.status IN ('COMPLETED','PAID')
             )
        )::float AS "earningsFirst",
        (SELECT COALESCE(SUM(oi2.quantity),0) FROM "OrderItem" oi2
           JOIN "Order" o7 ON o7.id = oi2."orderId"
           WHERE o7.status IN ('COMPLETED','PAID')
             AND o7."createdAt" = (
               SELECT MIN(o8."createdAt") FROM "Order" o8 WHERE o8.status IN ('COMPLETED','PAID')
             )
        )::int AS "productsSoldFirst"
    `

 const row = rowRaw || {
      customers: 0, customersPrev: 0,
      orders: 0, ordersPrev: 0,
      earnings: 0, earningsPrev: 0,
      productsSold: 0, productsSoldPrev: 0,
      customersFirst: 0, ordersFirst: 0, earningsFirst: 0, productsSoldFirst: 0
    }
    // Parseo
    const customers       = Number(row.customers)
    const orders          = Number(row.orders)
    const earnings        = parseFloat(Number(row.earnings).toFixed(2))
    const productsSold    = Number(row.productsSold)

    const prevCustomers   = Number(row.customersPrev)
    const prevOrders      = Number(row.ordersPrev)
    const prevEarnings    = Number(row.earningsPrev)
    const prevProducts    = Number(row.productsSoldPrev)

    const firstCustomers  = Number(row.customersFirst)
    const firstOrders     = Number(row.ordersFirst)
    const firstEarnings   = Number(row.earningsFirst)
    const firstProducts   = Number(row.productsSoldFirst)

    // % changes
    let customersPctChange = computePct(customers,     prevCustomers)
    let ordersPctChange    = computePct(orders,        prevOrders)
    let earningsPctChange  = computePct(earnings,      prevEarnings)
    let productsPctChange  = computePct(productsSold,  prevProducts)

    if (period === 'All') {
      customersPctChange = computePct(customers,    firstCustomers)
      ordersPctChange    = computePct(orders,       firstOrders)
      earningsPctChange  = computePct(earnings,     firstEarnings)
      productsPctChange  = computePct(productsSold, firstProducts)
    }

    return res.json({
      customers,
      orders,
      earnings,
      productsSold,
      customersPctChange,
      ordersPctChange,
      earningsPctChange,
      productsPctChange,
   
    })
  } catch (err) {
    console.error('Error in getDashboardStats:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getProductAnalytics(req, res) {
  try {
    const sort   = req.query.sort   || 'highestSales'
  
    // Decide cláusula ORDER BY según el parámetro sort
    let orderClause
    switch (sort) {
      case 'lowestSales':
        orderClause = `"totalSold" ASC`
        break
      case 'highestSales':
        orderClause = `"totalSold" DESC`
        break
      case 'lowestEarnings':
        orderClause = `"revenue" ASC`
        break
      case 'highestEarnings':
      default:
        orderClause = `"revenue" DESC`
        break
    }

    const products = await prisma.$queryRawUnsafe(`
      SELECT
        p.id,
        p.name,
        p."imageLeft"->>'url'      AS "image",
        c.name                     AS "category",
        p.price                    AS "price",
        COALESCE(SUM(oi.quantity),0)::int            AS "totalSold",
        COALESCE(SUM(oi.quantity * oi.price),0)::float AS "revenue"
      FROM "OrderItem" oi
      JOIN "Order" o  ON o.id       = oi."orderId"
      JOIN "Product" p ON p.id      = oi."productId"
      JOIN "Category" c ON c.id     = p."categoryId"
      WHERE o.status      IN ('COMPLETED','PAID')
      GROUP BY p.id, p.name, p."imageLeft", c.name, p.price
      ORDER BY ${orderClause};
    `)

    return res.json({ sort, products })
  } catch (err) {
    console.error('Error in getProductAnalytics:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getSalesTrend(req, res) {
  try {
    const period = req.query.period || 'Day';
    const now = new Date();
    let start, bucket; // 'hour' | 'day' | 'month' | 'year'

    if (period === 'Week') {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); bucket = 'day';
    } else if (period === 'Month') {
      start = new Date(now); start.setMonth(start.getMonth() - 1); bucket = 'day';
    } else if (period === '6 Months') {
      start = new Date(now); start.setMonth(start.getMonth() - 6); bucket = 'month';
    } else if (period === 'Year') {
      start = new Date(now); start.setFullYear(start.getFullYear() - 1); bucket = 'month';
    } else if (period === 'All') {
      start = new Date(0); bucket = 'year';
    } else {
      // Day (últimas 24h)
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000); bucket = 'hour';
    }
    const end = now; // [start, end)

    const IN_MEMORY_MAX = 50000;
    const count = await prisma.order.count({
      where: { status: { in: ['COMPLETED', 'PAID'] }, createdAt: { gte: start, lt: end } }
    });

    const pad2 = (n) => String(n).padStart(2, '0');
    const keyHourUTC  = (d) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}-${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}:00Z`;
    const keyDayUTC   = (d) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}-${pad2(d.getUTCDate())}`;
    const keyMonthUTC = (d) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}`;
    const keyYearUTC  = (d) => `${d.getUTCFullYear()}`;
    const labeller =
      bucket === 'hour'  ? keyHourUTC  :
      bucket === 'day'   ? keyDayUTC   :
      bucket === 'month' ? keyMonthUTC : keyYearUTC;


   if (count <= IN_MEMORY_MAX) {
      const orders = await prisma.order.findMany({
        where: { status: { in: ['COMPLETED', 'PAID'] }, createdAt: { gte: start, lt: end } },
        select: { createdAt: true, totalAmount: true },
        orderBy: { createdAt: 'asc' },
      });

      const acc = new Map();
      for (const o of orders) {
        const k = labeller(new Date(o.createdAt));
        acc.set(k, (acc.get(k) || 0) + Number(o.totalAmount || 0));
      }

      const data = [...acc.entries()]
        .sort((a,b)=> a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
        .map(([time, sum]) => ({ time, sales: Number(sum.toFixed(2)) }));

      return res.json({ period, data });
    }

    const trunc =
      bucket === 'hour'  ? 'hour'  :
      bucket === 'day'   ? 'day'   :
      bucket === 'month' ? 'month' : 'year';

    const rows = await prisma.$queryRaw`
      SELECT
        date_trunc(${trunc}, o."createdAt") AS bucket,
        SUM(o."totalAmount")::float         AS sales
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
       AND o."createdAt" >= ${start}
       AND o."createdAt" <  ${end}
      GROUP BY bucket
      ORDER BY bucket
    `;

    const data = (rows || []).map(r => ({
      time: labeller(new Date(r.bucket)),
      sales: Number(Number(r.sales).toFixed(2)),
    }));

    return res.json({ period, data });
  } catch (err) {
    console.error('Error in getSalesTrend:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = { getDashboardStats ,getProductAnalytics ,getCategorySales ,getSalesTrend ,getPerformance}
