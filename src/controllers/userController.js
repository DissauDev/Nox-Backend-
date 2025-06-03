const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../utils/jwtUtils');
const prisma = new PrismaClient();
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const { sendEmail } = require('../utils/email');  

const { generateAccessToken, generateRefreshToken }= require('../utils/jwtUtils.js');



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
      data: { refreshToken }
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

const updateUser = async (req, res, next) => {

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
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
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
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID invalid" });
    }

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
//--  
const deleteUser = async (req, res, next) => {
  try {

  const {id} = req.params
  
    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Buscar el usuario por su ID
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    // Si el usuario no existe, retorna un 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Si el usuario existe, procede a eliminarlo
   await prisma.user.delete({
      where: { id },
    });

    // Retorna una respuesta de éxito
    res.json({ message: 'User deleted' });
  } catch (error) {
    // Manejo de errores
    console.log(error);
        res.status(500).json({ message: "Error server" });
    next(error);

  }
};
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });;
    if (!user) {
      return res.status(404).json({ message: 'User o password invalid' });
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
    // Excluir la contraseña del objeto user
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
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

const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Not got a refreshToken' });
  }

  try {
    // Verificamos firma y expiración del refresh token
    const decoded = await verifyRefreshToken(refreshToken);

    // Opcional: validamos que ese refreshToken aparezca en BD para ese usuario
    // Por ejemplo:
    const userInDb = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { refreshToken: true }
    });

    if (!userInDb || userInDb.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token invalid' });
    }

    // Si todo está OK, generamos nuevos tokens
    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Guardamos el nuevo refreshToken en BD (invalidando el anterior)
    await prisma.user.update({
      where: { id: decoded.id },
      data: { refreshToken: newRefreshToken }
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    console.error('Error en refreshTokenHandler:', err);
    return res.status(401).json({ message: 'Refresh token invalid o expired' });
  }
};

const getCustomers = async (req, res) => {
  try {
    // 1) Parámetros de consulta
    const { search, page = '1', limit = '10' } = req.query;
    const pageNum = Math.max(parseInt(page, 10), 1);
    const take    = Math.min(Math.max(parseInt(limit, 10), 1), 100);
    const skip    = (pageNum - 1) * take;

    // 2) Construir filtro de usuarios
    const userWhere = { role: 'USER' };
    if (search) {
      userWhere.OR = [
        { name:  { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // 3) Total de usuarios que cumplen filtro
    const totalUsers = await prisma.user.count({
      where: userWhere
    });

    // 4) Traer sólo la página solicitada
    const users = await prisma.user.findMany({
      where: userWhere,
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
    // 1) Número total de usuarios
    const totalUsers = await prisma.user.count({ where: { role: 'USER' } });

    // 2) Agregado de todos los pedidos de esos usuarios
    const agg = await prisma.order.aggregate({
      where: { user: { role: 'USER' } },
      _count: { _all: true },
      _sum:   { totalAmount: true }
    });

    const totalOrders      = agg._count._all;
    const totalRevenue     = agg._sum.totalAmount || 0;
    const avgOrdersPerUser = totalUsers ? totalOrders / totalUsers : 0;
    const avgLifetimeSpend = totalUsers ? totalRevenue / totalUsers : 0;
    const avgOrderValue    = totalOrders  ? totalRevenue  / totalOrders  : 0;

    res.json({
      totalUsers,
      averageOrdersPerUser: avgOrdersPerUser,
      averageLifetimeSpend: avgLifetimeSpend,
      averageOrderValue:    avgOrderValue
    });
  } catch (error) {
    console.error(error);
       res.status(500).json({ message: "Error server" });
  }
};

const logout = (req, res) => {
  
  try {
    // Borra la cookie donde guardas el JWT
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const forgotPassword = async (req, res) => {

  try {
     const { email } = req.body;
     console.log(email);
     console.log(email === 'mauriciogarco@gmail.com');
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
    subject: "Password Reset",
    html: `Click here to reset your password: <a href="${resetURL}">${resetURL}</a>`
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
  const newHashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where:{ id: user.id },
    data:{
      password: newHashed,
      passwordResetToken: null,
      passwordResetExpires: null
    }
  });

  // 2) Opcional: devuelve JWT para loguear ya
  const tokenJWT = await generateJWT(user);
  res.status(200).json({ message: 'Password Update', token: tokenJWT });
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: 'Fail to update password' });
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

module.exports = { createUser,getStaffUsers, getAllUsers, updateUser, deleteUser,refreshTokenHandler,
   getUserById, login, updatePassword, getCustomers ,getUsersStats, logout, forgotPassword, resetPassword};
