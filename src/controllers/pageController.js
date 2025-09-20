const { prisma } = require('../lib/prisma');
// Obtener todas las páginas
 const getPages = async (req, res) => {
  try {
    const {
      search,
      sort = 'newest',
      page: pageStr = '1',
      limit: limitStr = '10',
    } = req.query;

    const pageNum = Math.max(parseInt(pageStr, 10), 1);
    const take    = Math.min(Math.max(parseInt(limitStr, 10), 1), 100);
    const skip    = (pageNum - 1) * take;

    // Build WHERE clause for search
    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug:  { contains: search, mode: 'insensitive' } },
      ];
    }

    // Determine orderBy
    const orderBy = {
      createdAt: sort === 'oldest' ? 'asc' : 'desc',
    };

    // Total count for pagination meta
    const totalItems = await prisma.page.count({ where });

    // Fetch paginated pages
    const pages = await prisma.page.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id:        true,
        title:     true,
        slug:      true,
        createdAt: true,
        updatedAt: true,
        // add other fields you need
      },
    });

    const totalPages = Math.ceil(totalItems / take);

    res.json({
      data: pages,
      meta: {
        totalItems,
        currentPage: pageNum,
        perPage: take,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error in getPages:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

// Obtener una página por slug
 const getPageBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }


};


// Crear una nueva página
 const createPage = async (req, res) => {
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
 const updatePage = async (req, res) => {
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
 const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.page.delete({ where: { id: Number(id) } });
    res.json({ message: "Page deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error ", error});
  }

};

module.exports = {
  deletePage,
  updatePage,
  createPage,
  getPageBySlug,
  getPages
}