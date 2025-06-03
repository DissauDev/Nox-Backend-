// controllers/analyticsControllers.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// compute percent change rounded to 2 decimals
function computePct(curr, prev) {
  const c = Number(curr)
  const p = Number(prev)
  let result
  if (p === 0) {
    result = c === 0 ? 0 : 100
  } else {
    result = ((c - p) / p) * 100
  }
  // round to 2 decimal places and return as Number
  return Number(result.toFixed(2))
}

// helper: merge two arrays by key
function mergeTrends(cur, prev) {
  const mapPrev = new Map(prev.map(e => [e.time, e.value]))
  return cur.map(e => ({
    time: e.time,
    current: Number(e.value),
    compare: Number(mapPrev.get(e.time) ?? 0),
  }))
}

async function getPerformance(req, res) {
  try {
    const { start, end, compareStart, compareEnd } = req.query
    if (!start || !end || !compareStart || !compareEnd) {
      return res.status(400).json({ message: 'Missing date range parameters' })
    }
    const startDate     = new Date(start)
    const endDate       = new Date(end)
    const prevStartDate = new Date(compareStart)
    const prevEndDate   = new Date(compareEnd)

    // summary metrics
    const [row] = await prisma.$queryRaw`
      SELECT
        COALESCE((SELECT SUM(o."totalAmount") FROM "Order" o
          WHERE o.status IN ('COMPLETED','PAID')
            AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
        ),0)::float AS sales_cur,
        COALESCE((SELECT SUM(o."totalAmount") FROM "Order" o
          WHERE o.status IN ('COMPLETED','PAID')
            AND o."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
        ),0)::float AS sales_prev,
        (SELECT COUNT(*) FROM "Order" o
          WHERE o."createdAt" BETWEEN ${startDate} AND ${endDate}
        )::int AS orders_cur,
        (SELECT COUNT(*) FROM "Order" o
          WHERE o."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
        )::int AS orders_prev,
        COALESCE((SELECT SUM(oi.quantity) FROM "OrderItem" oi
          JOIN "Order" o2 ON o2.id = oi."orderId"
          WHERE o2.status IN ('COMPLETED','PAID')
            AND o2."createdAt" BETWEEN ${startDate} AND ${endDate}
        ),0)::int AS products_cur,
        COALESCE((SELECT SUM(oi.quantity) FROM "OrderItem" oi
          JOIN "Order" o2 ON o2.id = oi."orderId"
          WHERE o2.status IN ('COMPLETED','PAID')
            AND o2."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
        ),0)::int AS products_prev,
        COALESCE((SELECT SUM(
            CASE WHEN jsonb_typeof(oi."chosenOptions") = 'array' 
                 THEN jsonb_array_length(oi."chosenOptions")
                 ELSE 0 END
          ) FROM "OrderItem" oi
          JOIN "Order" o3 ON o3.id = oi."orderId"
          WHERE o3.status IN ('COMPLETED','PAID')
            AND o3."createdAt" BETWEEN ${startDate} AND ${endDate}
        ),0)::int AS variations_cur,
        COALESCE((SELECT SUM(
            CASE WHEN jsonb_typeof(oi."chosenOptions") = 'array' 
                 THEN jsonb_array_length(oi."chosenOptions")
                 ELSE 0 END
          ) FROM "OrderItem" oi
          JOIN "Order" o3 ON o3.id = oi."orderId"
          WHERE o3.status IN ('COMPLETED','PAID')
            AND o3."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
        ),0)::int AS variations_prev;
    `

    // trends for charts
    const salesCur = await prisma.$queryRaw`
      SELECT to_char(o."createdAt", 'YYYY-MM-DD') AS time,
             SUM(o."totalAmount") AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
      GROUP BY time
      ORDER BY time;
    `
    const salesPrev = await prisma.$queryRaw`
      SELECT to_char(o."createdAt", 'YYYY-MM-DD') AS time,
             SUM(o."totalAmount") AS value
      FROM "Order" o
      WHERE o.status IN ('COMPLETED','PAID')
        AND o."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
      GROUP BY time
      ORDER BY time;
    `
    const ordersCur = await prisma.$queryRaw`
      SELECT to_char(o."createdAt", 'YYYY-MM-DD') AS time,
             COUNT(*) AS value
      FROM "Order" o
      WHERE o."createdAt" BETWEEN ${startDate} AND ${endDate}
      GROUP BY time
      ORDER BY time;
    `
    const ordersPrev = await prisma.$queryRaw`
      SELECT to_char(o."createdAt", 'YYYY-MM-DD') AS time,
             COUNT(*) AS value
      FROM "Order" o
      WHERE o."createdAt" BETWEEN ${prevStartDate} AND ${prevEndDate}
      GROUP BY time
      ORDER BY time;
    `

    const totalSales     = Number(row.sales_cur.toFixed(2))
    const prevSales      = Number(row.sales_prev.toFixed(2))
    const orders         = row.orders_cur
    const prevOrders     = row.orders_prev
    const productsSold   = row.products_cur
    const prevProducts   = row.products_prev
    const variationsSold = row.variations_cur
    const prevVariations = row.variations_prev

    const result = {
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
        sales: mergeTrends(salesCur, salesPrev),
        orders: mergeTrends(ordersCur, ordersPrev),
      }
    }

    return res.json(result)
  } catch (err) {
    console.error('Error in getPerformance:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getCategorySales(req, res) {
  try {
    const period = req.query.period || 'Day'
    const now = new Date()
    let start

    switch (period) {
      case 'Week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'Month':
        start = new Date(now)
        start.setMonth(start.getMonth() - 1)
        break
      case '6 Months':
        start = new Date(now)
        start.setMonth(start.getMonth() - 6)
        break
      case 'Year':
        start = new Date(now)
        start.setFullYear(start.getFullYear() - 1)
        break
      case 'All':
        start = new Date(0)
        break
      case 'Day':
      default:
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }

    // Fetch sales & itemsSold per category in the given period
    const rows = await prisma.$queryRaw`
      SELECT
        c.id,
        c.name,
        COALESCE(
          SUM(oi.quantity * oi.price) 
            FILTER (
              WHERE o.status IN ('COMPLETED','PAID')
                AND o."createdAt" BETWEEN ${start} AND ${now}
            ),
          0
        )::float AS sales,
        COALESCE(
          SUM(oi.quantity)
            FILTER (
              WHERE o.status IN ('COMPLETED','PAID')
                AND o."createdAt" BETWEEN ${start} AND ${now}
            ),
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
    `

    // Compute overall total
    const totalAll = rows.reduce((sum, r) => sum + Number(r.sales), 0)

    // Build final result
    const categories = rows.map((r) => ({
      id:         r.id,
      name:       r.name,
      sales:      Number(r.sales.toFixed(2)),
      itemsSold:  r.itemsSold,
      percentage: totalAll > 0
        ? Number(((r.sales / totalAll) * 100).toFixed(2))
        : 0,
    }))

    return res.json({
      period,
      totalAll:   Number(totalAll.toFixed(2)),
      categories,
    })
  } catch (err) {
    console.error('Error in getCategorySales:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getDashboardStats(req, res) {
  try {
    const period = req.query.period || 'Day'
    const now = new Date()
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

    const [row] = await prisma.$queryRaw`
      SELECT
        /* Usuarios */
        (SELECT COUNT(*) FROM "User" u
           WHERE u.role = 'USER'
             AND u."createdAt" BETWEEN ${currentStart} AND ${now}
        )::int AS "customers",
        (SELECT COUNT(*) FROM "User" u
           WHERE u.role = 'USER'
             AND u."createdAt" BETWEEN ${prevStart} AND ${prevEnd}
        )::int AS "customersPrev",

        /* Órdenes */
        (SELECT COUNT(*) FROM "Order" o
           WHERE o."createdAt" BETWEEN ${currentStart} AND ${now}
        )::int AS "orders",
        (SELECT COUNT(*) FROM "Order" o
           WHERE o."createdAt" BETWEEN ${prevStart} AND ${prevEnd}
        )::int AS "ordersPrev",

        /* Ganancias */
        (SELECT COALESCE(SUM(o."totalAmount"),0) FROM "Order" o
           WHERE o."createdAt" BETWEEN ${currentStart} AND ${now}
             AND o.status IN ('COMPLETED','PAID')
        )::float AS "earnings",
        (SELECT COALESCE(SUM(o."totalAmount"),0) FROM "Order" o
           WHERE o."createdAt" BETWEEN ${prevStart} AND ${prevEnd}
             AND o.status IN ('COMPLETED','PAID')
        )::float AS "earningsPrev",

        /* Productos vendidos */
        (SELECT COALESCE(SUM(oi.quantity),0) FROM "OrderItem" oi
           JOIN "Order" o2 ON o2.id = oi."orderId"
           WHERE o2."createdAt" BETWEEN ${currentStart} AND ${now}
             AND o2.status IN ('COMPLETED','PAID')
        )::int AS "productsSold",
        (SELECT COALESCE(SUM(oi.quantity),0) FROM "OrderItem" oi
           JOIN "Order" o2 ON o2.id = oi."orderId"
           WHERE o2."createdAt" BETWEEN ${prevStart} AND ${prevEnd}
             AND o2.status IN ('COMPLETED','PAID')
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
    const period = req.query.period || 'Day'
    const now = new Date()
    let rows

    if (period === 'Week') {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'Dy') AS time,
          SUM(o."totalAmount")     AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'Dy')
        ORDER BY MIN(o."createdAt");
      `
    } else if (period === 'Month') {
      const start = new Date(now); start.setMonth(start.getMonth() - 1)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'DD Mon') AS time,
          SUM(o."totalAmount")           AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'DD Mon')
        ORDER BY MIN(o."createdAt");
      `
    } else if (period === '6 Months') {
      const start = new Date(now); start.setMonth(start.getMonth() - 6)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'Mon') AS time,
          SUM(o."totalAmount")          AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'Mon')
        ORDER BY MIN(o."createdAt");
      `
    } else if (period === 'Year') {
      const start = new Date(now); start.setFullYear(start.getFullYear() - 1)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'Mon') AS time,
          SUM(o."totalAmount")          AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'Mon')
        ORDER BY MIN(o."createdAt");
      `
    } else if (period === 'All') {
      const start = new Date(0)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'YYYY') AS time,
          SUM(o."totalAmount")           AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'YYYY')
        ORDER BY MIN(o."createdAt");
      `
    } else {
      // Day
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      rows = await prisma.$queryRaw`
        SELECT
          to_char(o."createdAt", 'HH24:MI') AS time,
          SUM(o."totalAmount")              AS sales
        FROM "Order" o
        WHERE o.status IN ('COMPLETED','PAID')
          AND o."createdAt" BETWEEN ${start} AND ${now}
        GROUP BY to_char(o."createdAt", 'HH24:MI')
        ORDER BY MIN(o."createdAt");
      `
    }

    const data = rows.map(r => ({
      time: r.time,
      sales: parseFloat(Number(r.sales).toFixed(2))
    }))

    return res.json({ period, data })
  } catch (err) {
    console.error('Error in getSalesTrend:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}



module.exports = { getDashboardStats ,getProductAnalytics ,getCategorySales ,getSalesTrend ,getPerformance}
