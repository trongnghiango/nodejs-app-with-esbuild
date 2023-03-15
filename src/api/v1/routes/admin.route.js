const { Router } = require('express');

const { createApiKeyHandler } = require('../controllers/admin.controller');
const { _requireRole } = require('../helpers/role');
const { checkApiKey } = require('../middleware/apikey.middleware');
const Auth = require('../middleware/Auth');

const router = Router();

router.use(
  '/apikey/create',
  checkApiKey,
  _requireRole('ADMIN'),
  Auth.checkRole,
  createApiKeyHandler
);

module.exports = router;
