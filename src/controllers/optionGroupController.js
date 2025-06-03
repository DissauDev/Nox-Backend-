const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- OptionGroups CRUD ---
async function createOptionGroup(req, res) {
  try {
    const { name, required = false, maxSelectable = null } = req.body;
    const group = await prisma.optionGroup.create({
      data: { name, required, maxSelectable },
    });
    res.status(201).json(group);
  } catch (err) {
    console.error('Error creating option group:', err);
   res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllOptionGroups(req, res) {
  try {
    const groups = await prisma.optionGroup.findMany();
    res.json(groups);
  } catch (err) {
    console.error('Error fetching option groups:', err);
 res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOptionGroupById(req, res) {
  try {
    const { groupId } = req.params;
    const group = await prisma.optionGroup.findUnique({
      where: { id: groupId },
      include: { productOptions: true },
    });
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json(group);
  } catch (err) {
    console.error('Error fetching option group:', err);
  res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateOptionGroup(req, res) {
  try {
    const { groupId } = req.params;
    const data = req.body; // { name?, required?, maxSelectable? }
    const updated = await prisma.optionGroup.update({
      where: { id: groupId },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating option group:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function deleteOptionGroup(req, res) {
  try {
    const { groupId } = req.params;

    // 1) Borrar todos los valores seleccionados (ProductOptionValue) de este grupo
    await prisma.productOptionValue.deleteMany({
      where: {
        productOption: { groupId },
      },
    });

    // 2) Borrar todas las asociaciones producto↔grupo (ProductOption)
    await prisma.productOption.deleteMany({
      where: { groupId },
    });

    // 3) Borrar todos los valores propios de este grupo (OptionValue)
    await prisma.optionValue.deleteMany({
      where: { groupId },
    });

    // 4) Finalmente borrar el grupo
    await prisma.optionGroup.delete({
      where: { id: groupId },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Error deleting option group:", error);
   res.status(500).json({ message: 'Internal server error' });
  }
}

// --- OptionValues CRUD ---
async function createOptionValue(req, res) {
  try {
    const { groupId } = req.params;
    const { name, extraPrice , imageUrl , description} = req.body;
    const value = await prisma.optionValue.create({
      data: { name, extraPrice, groupId, imageUrl ,description},
    });
    res.status(201).json(value);
  } catch (err) {
    console.error('Error creating option value:', err);
 res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllOptionValues(req, res) {
  try {
    const { groupId } = req.params;
    const values = await prisma.optionValue.findMany({
      where: { groupId },
    });
    res.json(values);
  } catch (err) {
    console.error('Error fetching option values:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOptionValueById(req, res) {
  try {
    const { valueId } = req.params;
    const value = await prisma.optionValue.findUnique({
      where: { id: valueId },
    });
    if (!value) return res.status(404).json({ message: 'Value not found' });
    res.json(value);
  } catch (err) {
    console.error('Error fetching option value:', err);
    res.status(500).json({ message: 'Internal server Error' });
  }
}

async function updateOptionValue(req, res) {
  try {
    const { valueId } = req.params;
    const data = req.body; // { name?, extraPrice? }
    const updated = await prisma.optionValue.update({
      where: { id: valueId },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating option value:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteOptionValue(req, res) {
  try {
    const { valueId } = req.params;
    await prisma.optionValue.delete({ where: { id: valueId } });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting option value:', err);
   res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createOptionGroup,
  getAllOptionGroups,
  getOptionGroupById,
  updateOptionGroup,
  deleteOptionGroup,
  createOptionValue,
  getAllOptionValues,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue,
};
