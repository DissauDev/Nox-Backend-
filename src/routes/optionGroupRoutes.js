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
  deleteOptionValue,
  patchOptionValueStatus,
  bulkUpdateOptionValuesStatus,
  bulkCloneOptionValue,
  bulkAddonGroups,
  bulkDeleteOptionValuesByName,
 getAllOptValandPtslikeOpt
} = require('../controllers/optionGroupController');

// OptionGroup CRUD
router.post('/option-group',                   createOptionGroup);
router.post('/option-groups/:groupId/option-values/bulk-add', bulkAddonGroups);

router.get('/option-group',                    getAllOptionGroups);
router.get('/option-group/all-opt',                    getAllOptValandPtslikeOpt);
router.get('/option-group/:groupId',            getOptionGroupById);
router.put('/option-group/:groupId',            updateOptionGroup);
router.delete('/option-group/:groupId',         deleteOptionGroup);
// OptionValue status (uno)
router.patch('/option-values/:valueId/status', patchOptionValueStatus);
// OptionValue status (bulk)
router.post('/option-values/bulk-status', bulkUpdateOptionValuesStatus);
// POST por claridad (body con JSON). Si prefieres DELETE también vale.
router.post('/option-values/bulk-delete-by-name', bulkDeleteOptionValuesByName);
router.post('/option-values/bulk-clone', bulkCloneOptionValue);
// OptionValue CRUD
router.post('/option-group/:groupId/values',          createOptionValue);
router.get('/option-group/:groupId/values',           getAllOptionValues);
router.get('/option-group/:groupId/values/:valueId',  getOptionValueById);
router.put('/option-group/:groupId/values/:valueId',  updateOptionValue);
router.delete('/option-group/:groupId/values/:valueId', deleteOptionValue);

module.exports = router;
