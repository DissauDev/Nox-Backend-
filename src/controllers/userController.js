const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../utils/jwtUtils');
const prisma = new PrismaClient();

// Crear usuario
const createUser = async (req, res) => {

  const { email, password, role, name} = req.body;

  if(!email || !password || !role || !name) {
    return res.status(400).json({
      error: "Campos incompletos"
    })
  }

  const areEmail = await prisma.user.findUnique({
    where: { email }
  })

  if (areEmail) {
    return res.status(400).json({
      message: 'Este email ya está registrado'
    })
  }
      // Validación del role (ajusta la lista de roles válidos según tu lógica)
      const validRoles = ['USER', 'ADMIN', 'EMPLOYEE'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          message: 'El role proporcionado no es válido'
        });
      }
 
  //Encriptar la contraseña
  const hashedPassword = await bcryptjs.hash(password, 6)

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        role,
        email,
        password: hashedPassword,

      },
    });
    
    const token = await generateJWT(newUser);
 // Excluir la contraseña del objeto que se devuelve
 const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword, token });

  } catch (err) {
    console.error('Error creando usuario en la base de datos:', err);
    return res.status(500).json({ error: 'Database error' });

  }
};

const getUserById = async (req, res, next) => {
  const {id} = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
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
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res, next) => {

  const {id} = req.params;
  if(!id){
    return res.status(400).json({
      error:"debe mandar el id"
    })
  }
  const data = req.body;

  try {
    const user = await   prisma.user.update({
      where: { id: id },
      data,
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
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
    return res.status(400).json({ message: "La nueva contraseña es requerida." });
  }

  try {
    // Asegúrate de que el ID sea un número
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcryptjs.hash(password, 6);

    // Actualizar la contraseña
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor." });
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
      return res.status(404).json({ message: 'Usuario no encontrado' });
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
    next(error);
  }
};
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
      return res.status(401).json({ message: 'Usuario o contraseña incorrecto' });
    }

    const token = await generateJWT(user);

    // Excluir la contraseña del objeto user
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token: token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Consulta al administrador'
    });
  }

}


module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUserById, login, updatePassword};
