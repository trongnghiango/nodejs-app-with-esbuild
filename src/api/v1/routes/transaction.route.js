const { Router } = require("express");
const {
  getTransactionsHandler,
  createTransactionHandler,
} = require("../controllers/transaction.controller");

const router = Router();

// router.use(
//   Auth.authentication,
//   _requiredRole("ADMIN", "GUEST"),
//   Auth.checkRole
// ); // xac thuc nguoi dung la ai?

router.get("/list", getTransactionsHandler);
router.post("/create", createTransactionHandler);
module.exports = router;
