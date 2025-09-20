
const { prisma } = require('../lib/prisma');

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
   if(taxEnabled === undefined || taxPercent === undefined || taxFixed === undefined) {
    return   res.status(400).json({ message: 'taxFixed,taxPercent & taxEnabled are required' });
   }
    const config = await prisma.storeConfig.create({data:{taxEnabled: Boolean(taxEnabled), taxFixed: Number(taxFixed), taxPercent: Number(taxPercent)}})

  return res.status(201).json(config);
  } catch (error) {
      if (error?.code === 'P2002' && error?.meta?.target?.includes('id')) {
    return res.status(409).json({ message: 'Config already exists' });
   }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Actualizar la configuración (solo admin)
const updateStoreConfig = async (req, res) => {
  try {
    const { taxEnabled, taxPercent, taxFixed } = req.body;
   const updated = await prisma.storeConfig.upsert({
     where: { id: 1 },
     update: { taxEnabled, taxPercent, taxFixed },
     create: { id: 1, taxEnabled, taxPercent, taxFixed }
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