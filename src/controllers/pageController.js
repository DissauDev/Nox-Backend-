import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todas las páginas
export const getPages = async (req, res) => {
  try {
    const pages = await prisma.page.findMany();
    res.json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }

};

// Obtener una página por slug
export const getPageBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }


};

// Crear una nueva página
export const createPage = async (req, res) => {
  try {
    const { title, slug, layout } = req.body;
    const page = await prisma.page.create({
      data: { title, slug, layout },
    });
    res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }

};

// Actualizar el layout de una página
export const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { layout } = req.body;
    const page = await prisma.page.update({
      where: { id: Number(id) },
      data: { layout },
    });
    res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }
 
};

// Eliminar una página
export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.page.delete({ where: { id: Number(id) } });
    res.json({ message: "Page deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }

};
