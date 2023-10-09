const { Router } = require("express");
const { createApiKeyHandler } = require("../controllers/admin.controller");
const { _requireRole } = require("../helpers/role");
const { checkApiKey } = require("../middleware/apikey.middleware");
const Auth = require("../middleware/Auth");

const router = Router();

router.use(checkApiKey);
router.use(_requireRole("ADMIN"));
router.use(Auth.checkRole);

router.post("/apikey/create", createApiKeyHandler);

module.exports = router;
