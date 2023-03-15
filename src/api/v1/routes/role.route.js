const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const {
  createRoleHandler,
  getRoleByIdHandler,
} = require('../controllers/admin.controller');
const Auth = require('../middleware/Auth');
const {
  validateCreatedRole,
  validateRoleId,
} = require('../validators/roles.validator');
const { _requireRole } = require('../helpers/role');

const router = Router();

router.post(
  '/create',
  validateCreatedRole,
  _requireRole('GUEST'),
  asyncHandler(async (req, res, next) => Auth.checkRole(req, res, next)),
  createRoleHandler
);

router.get(
  '/:id',
  validateRoleId,
  _requireRole('CUSTOMMER_CARE', 'ADMIN'), // user phải có quyền 'GUEST' mới được phép truy xuất api này.
  asyncHandler(async (req, res, next) => Auth.checkRole(req, res, next)), // check
  getRoleByIdHandler
);

module.exports = router;
