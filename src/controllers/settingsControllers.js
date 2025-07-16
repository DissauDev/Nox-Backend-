const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




 const getStoreConfig = async (req, res) => {
  try {
    const config = await prisma.storeConfig.findUnique({
      where: { id: 1 },
    });
    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }
    res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createStoreConfig = async (req, res) => {

  try {
   const {taxFixed,taxPercent,taxEnabled} = req.body 
   if(!taxEnabled || !taxFixed || !taxPercent) {
    return   res.status(400).json({ message: 'taxFixed,taxPercent & taxEnabled are required' });
   }
    const config = await prisma.storeConfig.create({data:{taxEnabled,taxFixed,taxPercent}})

    res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Actualizar la configuración (solo admin)
const updateStoreConfig = async (req, res) => {
  try {
    const { taxEnabled, taxPercent, taxFixed } = req.body;

    const updated = await prisma.storeConfig.update({
      where: { id: 1 },
      data: {
        taxEnabled,
        taxPercent,
        taxFixed,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
updateStoreConfig,getStoreConfig,createStoreConfig
};