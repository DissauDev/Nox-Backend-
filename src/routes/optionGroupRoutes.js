const router = require('express').Router();
const {
  createOptionGroup,
  getAllOptionGroups,
  getOptionGroupById,
  updateOptionGroup,
  deleteOptionGroup,
  createOptionValue,
  getAllOptionValues,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue
} = require('../controllers/optionGroupController');

// OptionGroup CRUD
router.post('/option-group',                   createOptionGroup);
router.get('/option-group',                    getAllOptionGroups);
router.get('/option-group/:groupId',            getOptionGroupById);
router.put('/option-group/:groupId',            updateOptionGroup);
router.delete('/:groupId',         deleteOptionGroup);

// OptionValue CRUD
router.post('/option-group/:groupId/values',          createOptionValue);
router.get('/option-group/:groupId/values',           getAllOptionValues);
router.get('/option-group/:groupId/values/:valueId',  getOptionValueById);
router.put('/option-group/:groupId/values/:valueId',  updateOptionValue);
router.delete('/option-group/:groupId/values/:valueId', deleteOptionValue);

module.exports = router;
