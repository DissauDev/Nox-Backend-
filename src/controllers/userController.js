
const bcryptjs = require('bcryptjs');
const { prisma } = require('../lib/prisma');
const crypto = require('crypto')
const { sendEmail } = require('../utils/email');  
const { verifyRefreshToken }= require('../utils/jwtUtils.js');
const { generateAccessToken, generateRefreshToken }= require('../utils/jwtUtils.js');


const REFRESH_DAYS = 1;
const refreshExpiryDate = () => new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000);

const REFRESH_TOKEN_TTL_DAYS = 1;
const calcRefreshExpiry = () =>
  new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
// Crear usuario
const createUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  if (!email || !password || !role || !name) {
    return res.status(400).json({
      message: 'Email, password, role and name are required'
    });
  }

  // Verificar si el email ya está registrado
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  if (existingUser) {
    return res.status(400).json({
      message: 'This email is already registered'
    });
  }

  // Validación del role
  const validRoles = ['USER', 'ADMIN', 'EMPLOYEE'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      message: 'This role is invalid'
    });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcryptjs.hash(password, 6);

  try {
    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        role,
        email,
        password: hashedPassword,
        // El campo `refreshToken` se añadirá justo después de generar el refresh token
      },
    });

    // Preparamos el payload para los JWT
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };

    // Generar access y refresh tokens
    const accessToken  = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Guardar el refreshToken en la base de datos del usuario recién creado
    await prisma.user.update({
      where: { id: newUser.id },
      data: { refreshToken,  refreshTokenExpires: refreshExpiryDate(), }
    });

    // Excluir la contraseña del objeto de respuesta
    const { password: _, refreshToken: __, ...userWithoutPassword } = newUser;

    // Retornar el usuario (sin contraseña), accessToken y refreshToken
    res.status(201).json({
      user: userWithoutPassword,
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error('Error creating user in database:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};
const getUserById = async (req, res, next) => {
  const {id} = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) return res.status(404).json({ message: 'Usuario not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    // 1) Parámetros de consulta
    const { search, page = '1', limit = '10' } = req.query;
    const pageNum = Math.max(parseInt(page, 10), 1);
    const take    = Math.min(Math.max(parseInt(limit, 10), 1), 100);
    const skip    = (pageNum - 1) * take;

    const baseWhere = {
      OR: [
    { role: "USER" },
    { role: "ADMIN", orders: { some: {} } },
      { role: "EMPLOYEE", orders: { some: {} } },
  ],
    };
    // const adminWhere = {role: 'ADMIN' && {orders: length: { gt: 0 }}}; // Removed invalid line
  
if (search) {
  where = {
    AND: [
      baseWhere,
      {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    ],
  };
}

    // 3) Total de usuarios que cumplen filtro
    const totalUsers = await prisma.user.count({
      where: baseWhere
    });

    // 4) Traer sólo la página solicitada
    const users = await prisma.user.findMany({
      where: baseWhere,
      select: {
        id:         true,
        name:       true,
        email:      true,
        createdAt:  true,

      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    });

    const userIds = users.map(u => u.id);

    // 5) Agrupar órdenes sólo de estos usuarios
    const orderStats = userIds.length
      ? await prisma.order.groupBy({
          by: ['userId'],
          where: {
            userId: { in: userIds }
          },
          _count: { _all: true },
          _sum:   { totalAmount: true },
          _avg:   { totalAmount: true },
          _max:   { createdAt: true }
        })
      : [];

    // 6) Combinar usuarios + stats
    const data = users.map(u => {
      const stats = orderStats.find(o => o.userId === u.id) || {
        _count: { _all: 0 },
        _sum:   { totalAmount: 0 },
        _avg:   { totalAmount: 0 },
        _max:   { createdAt: null }
      };
      return {
        id:                u.id,
        name:              u.name,
        email:             u.email,
        registeredAt:      u.createdAt,
        lastOrderDate:     stats._max.createdAt,
        totalOrders:       stats._count._all,
        totalSpent:        stats._sum.totalAmount || 0,
        averageOrderValue: stats._avg.totalAmount || 0
      };
    });

    // 7) Respuesta con paginación
    res.json({
      data,
      meta: {
        totalItems:  totalUsers,
        currentPage: pageNum,
        perPage:     take,
        totalPages:  Math.ceil(totalUsers / take)
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Server' });
  }
}

const getUsersStats = async (req, res) => {
  try {
    // 1) Contar todos los usuarios únicos que han hecho pedidos (clientes reales)
  const distinctCustomers = await prisma.order.findMany({
  where: { userId: { not: null } },
  distinct: ['userId'],
  select: { userId: true },
});


    const totalCustomers = distinctCustomers.length;

    // 2) Agregar todos los pedidos (de todos los roles)
    const agg = await prisma.order.aggregate({
      _count: { _all: true },
      _sum:   { totalAmount: true }
    });

    const totalOrders      = agg._count._all;
    const totalRevenue     = agg._sum.totalAmount || 0;
    const avgOrdersPerUser = totalCustomers ? totalOrders / totalCustomers : 0;
    const avgLifetimeSpend = totalCustomers ? totalRevenue / totalCustomers : 0;
    const avgOrderValue    = totalOrders  ? totalRevenue  / totalOrders  : 0;

    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue,
      averageOrdersPerCustomer: avgOrdersPerUser,
      averageLifetimeSpend: avgLifetimeSpend,
      averageOrderValue:avgOrderValue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

 const getStaffUsers = async (req, res) => {
  try {
    const {
      search = '',
      page: pageStr = '1',
      limit: limitStr = '10',
    } = req.query;

    const page = Math.max(parseInt(pageStr, 10), 1);
    const perPage = Math.min(Math.max(parseInt(limitStr, 10), 1), 100);
    const skip = (page - 1) * perPage;

    // Build WHERE: only ADMIN or EMPLOYEE, optional name filter
    const where = {
      role: { in: ['ADMIN', 'EMPLOYEE'] },
    };
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    // Total count for meta
    const totalItems = await prisma.user.count({ where });

    // Fetch paginated
    const users = await prisma.user.findMany({
      where,
      skip,
      take: perPage,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { name: 'asc' },
    });

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      data: users,
      meta: {
        totalItems,
        currentPage: page,
        perPage,
        totalPages,
      },
    });
  } catch (err) {
    console.error('getStaffUsers error:', err);
    res.status(500).json({ message: err.message });
  }
};
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  // Validar entrada
  if (!password) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    // Asegúrate de que el ID sea un número
    const userId = id;
   
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcryptjs.hash(password, 6);

    // Actualizar la contraseña
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error server" });
  }
};
const forgotPassword = async (req, res) => {

  try {
     const { email } = req.body;
 
  if(!email) return res.status(400).json({message:'Email is required'});
  const user = await prisma.user.findUnique({ where:{ email }});
  if (!user) return res.status(400).json({ message: 'User not found' });

  // 1) Genera token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.createHash('sha256').update(resetToken).digest('hex');

  // 2) Guarda el hash + expiración
  await prisma.user.update({
    where:{ id: user.id },
    data:{
      passwordResetToken: hashed,
      passwordResetExpires: new Date(Date.now() + 60*60*1000)
    }
  });

  // 3) Envía email con la URL
  const resetURL = `${process.env.FRONT_URL}/forgot-password?token=${resetToken}`;
await sendEmail({
  to: user.email,
  subject: "Reset Your Password - Nox Cookie Bar",
  html: `
  <div style="background-color: #FDF9F3; padding: 40px; font-family: Arial, sans-serif; color: #2f3b79;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color: #2f3b79;">Reset your password</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        Hello <strong>${user.name || user.email}</strong>,
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        We received a request to reset your password. If you didn’t request this, please ignore this email.
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        Otherwise, click the button below to choose a new password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetURL}" style="background-color: #2f3b79; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        This link will expire in 1 hour. If you have any questions or need assistance, please contact our support team.
      </p>
      <p style="font-size: 14px; color: #777; margin-top: 40px;">
        Thank you,<br/>
        The Nox Cookie Bar Team
      </p>
    </div>
  </div>
  `
});


  res.status(200).json({ message: 'Email Send' });
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: 'Error to send email' });
  }
 
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await prisma.user.findFirst({
    where:{
      passwordResetToken: hashed,
      passwordResetExpires: { gt: new Date() }
    }
  });
  if (!user) return res.status(400).json({ message: 'Token invalid or expired.' });

  // 1) Actualiza contraseña
  const newHashed = await bcryptjs.hash(password,6);
  await prisma.user.update({
    where:{ id: user.id },
    data:{
      password: newHashed,
      passwordResetToken: null,
      passwordResetExpires: null
    }
  });

  res.status(200).json({ message: 'Password Update' });
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: 'Fail to update password' });
  }
  
};
//--  

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar contraseña
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'User or password invalid' });
    }

    const payload = {
  id: user.id,
  email: user.email,
  role: user.role
};
   
const accessToken  = generateAccessToken(payload);
const refreshToken = generateRefreshToken(payload);
    // Excluir la contraseña del objeto user// Guarda el refresh token en BD para que /refresh pueda validarlo luego
   await prisma.user.update({
     where: { id: user.id },     data: { refreshToken, refreshTokenExpires: refreshExpiryDate(), }
   });
    const { password: _pw, refreshToken: _rt, ...userWithoutSensitive } = user;
    res.status(201).json({
      user: userWithoutSensitive,
       accessToken,
  refreshToken
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error'
    });
  }

}

const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
  try {
    // Si el usuario existe, procede a eliminarlo
   await prisma.user.delete({
      where: { id },
    });
    // Retorna una respuesta de éxito
    res.json({ message: 'User deleted' });
  } catch (error) {
       // Prisma: registro no encontrado
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    // Manejo de errores
    console.log(error);
        res.status(500).json({ message: "Error server" ,error});
 

  }
};

const updateUser = async (req, res,) => {

  const {id} = req.params;
  if(!id){
    return res.status(400).json({
      message:"Id params is required"
    })
  }
  const data = req.body;

  try {
    const user = await   prisma.user.update({
      where: { id: id },
      data,
    });
   
    res.json(user);
  } catch (error) {
       // Prisma: registro no encontrado
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
     console.log(error);
        res.status(500).json({ message: "Error server",error });
  }
};

const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({ message: "Not got a refreshToken" });
  }

  try {
    // 1) Verificamos firma y expiración del refresh token (JWT)
    const decoded = await verifyRefreshToken(refreshToken);

    // 2) Verificamos que ese refresh token sea el activo en BD + no esté expirado server-side
    const userInDb = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        refreshToken: true,
        refreshTokenExpires: true,
      },
    });

    // Si no existe usuario o no coincide el refresh token => posible robo/reuse
    if (!userInDb || !userInDb.refreshToken || userInDb.refreshToken !== refreshToken) {
      // Seguridad: revoca cualquier sesión activa del usuario si existe
      if (userInDb?.id) {
        await prisma.user.update({
          where: { id: userInDb.id },
          data: { refreshToken: null, refreshTokenExpires: null },
        });
      }
      return res.status(401).json({ message: "Refresh token invalid" });
    }

    // Expiración server-side (fuerza re-login aunque el cliente conserve token)
    if (
      !userInDb.refreshTokenExpires ||
      userInDb.refreshTokenExpires.getTime() < Date.now()
    ) {
      await prisma.user.update({
        where: { id: userInDb.id },
        data: { refreshToken: null, refreshTokenExpires: null },
      });
      return res.status(401).json({
        message: "Refresh token expired. Please login again.",
      });
    }

    // 3) Generamos nuevos tokens (rotación)
    const payload = {
      id: userInDb.id,
      email: userInDb.email,
      role: userInDb.role,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // 4) Guardamos el nuevo refresh token en BD (invalidando el anterior)
    await prisma.user.update({
      where: { id: userInDb.id },
      data: {
        refreshToken: newRefreshToken,
        refreshTokenExpires: calcRefreshExpiry(),
      },
    });

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Error en refreshTokenHandler:", err);
    // Si el JWT refresh ya está vencido o firma inválida
    return res.status(401).json({ message: "Refresh token invalid o expired" });
  }
};

/**
 * POST /auth/logout
 * OJO: este endpoint asume que el front te manda refreshToken para revocarlo,
 * o que ya tienes middleware auth y pones req.user.id.
 *
 * body: { refreshToken? }
 */
const logout = async (req, res) => {
  try {
    // Si usas cookies en algún punto, esto está OK (no estorba).
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // ✅ Logout REAL: revocar refresh token en BD
    // Opción 1 (recomendada en tu arquitectura actual): el cliente manda refreshToken
    const { refreshToken } = req.body || {};

    if (refreshToken && typeof refreshToken === "string") {
      // Validamos el refresh para obtener el userId y revocar
      try {
        const decoded = await verifyRefreshToken(refreshToken);

        // Solo revoca si coincide con el guardado (evita borrar sesiones por tokens random)
        const userInDb = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { refreshToken: true },
        });

        if (userInDb?.refreshToken && userInDb.refreshToken === refreshToken) {
          await prisma.user.update({
            where: { id: decoded.id },
            data: { refreshToken: null, refreshTokenExpires: null },
          });
        }
      } catch (e) {
        // Si el refresh es inválido/expirado, igual respondemos OK (logout es idempotente)
      }
    }

    // Opción 2: si tienes middleware y ya viene el user id:
    // if (req.user?.id) {
    //   await prisma.user.update({
    //     where: { id: req.user.id },
    //     data: { refreshToken: null, refreshTokenExpires: null },
    //   });
    // }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { createUser,getStaffUsers, getAllUsers, updateUser, deleteUser,refreshTokenHandler,
   getUserById, login, updatePassword, getCustomers ,getUsersStats, logout, forgotPassword, resetPassword};
