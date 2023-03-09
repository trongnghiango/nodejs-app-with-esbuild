const { Router } = require('express');
const { createRoleHandler } = require('../controllers/admin.controller');
const Auth = require('../middleware/Auth');
const { validateCreatedRole } = require('../validators/roles.validator');
const { _requireRole } = require('../helpers/role');

const router = Router();

router.post(
  '/create',
  validateCreatedRole,
  _requireRole('GUEST'),
  Auth.checkRole,
  createRoleHandler
);

module.exports = router;
