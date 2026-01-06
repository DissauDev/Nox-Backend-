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
 getAllOptValandPtslikeOpt,
 sortOptionValues
} = require('../controllers/optionGroupController');


  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");

// OptionGroup CRUD
router.post('/option-group',authenticateBearer,requireAdminOrEmployee, createOptionGroup);
router.post('/option-groups/:groupId/option-values/bulk-add',authenticateBearer,requireAdminOrEmployee, bulkAddonGroups);

router.get('/option-group',                    getAllOptionGroups);
router.get('/option-group/all-opt',                    getAllOptValandPtslikeOpt);
router.get('/option-group/:groupId',            getOptionGroupById);
router.put('/option-group/:groupId',authenticateBearer,requireAdminOrEmployee,            updateOptionGroup);
router.delete('/option-group/:groupId', authenticateBearer,requireAdminOrEmployee,        deleteOptionGroup);
// OptionValue status (uno)
router.patch('/option-values/:valueId/status',authenticateBearer,requireAdminOrEmployee, patchOptionValueStatus);
// OptionValue status (bulk)
router.post('/option-values/bulk-status',authenticateBearer,requireAdminOrEmployee, bulkUpdateOptionValuesStatus);
// POST por claridad (body con JSON). Si prefieres DELETE también vale.
router.post('/option-values/bulk-delete-by-name',authenticateBearer,requireAdminOrEmployee, bulkDeleteOptionValuesByName);
router.post('/option-values/bulk-clone',authenticateBearer,requireAdminOrEmployee, bulkCloneOptionValue);
// OptionValue CRUD
router.post('/option-group/:groupId/values', authenticateBearer,requireAdminOrEmployee,         createOptionValue);
router.get('/option-group/:groupId/values',           getAllOptionValues);
router.get('/option-group/:groupId/values/:valueId',  getOptionValueById);
router.put('/option-group/:groupId/values/:valueId',authenticateBearer,requireAdminOrEmployee,  updateOptionValue);
router.delete('/option-group/:groupId/values/:valueId',authenticateBearer,requireAdminOrEmployee, deleteOptionValue);

router.patch("/option-group/:groupId/values/:valueId/sort-order",authenticateBearer,requireAdminOrEmployee, sortOptionValues);
module.exports = router;
