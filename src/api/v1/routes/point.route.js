const { Router } = require("express");
const {
  getPointsHandler,
  createPointHandler,
} = require("../controllers/point.controller");

const router = Router();

// router.use(
//   Auth.authentication,
//   _requiredRole("ADMIN", "GUEST"),
//   Auth.checkRole
// ); // xac thuc nguoi dung la ai?

router.get("/list", getPointsHandler);
router.post("/create", createPointHandler);
module.exports = router;
