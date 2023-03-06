const express = require("express");
const { successHandler } = require("../core/ApiResponse");
const logger = require("../../../utils/logger")

const {
  refreshToken,
  signIn,
  signUp
} = require("../controllers/auth.controller");

const {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} = require("../middleware/jwt");

// main router v1;
const router = express.Router();

/**
 * GET method
 * @path("/checkhealth")
 */
router.get("/checkhealth", async (req, res) => {
  const payload = {
    id: 2,
    email: "ksdjf",
  };

  res.json(successHandler({
    results: {
      tokens: {
        accessToken: await signAccessToken(payload),
        refreshToken: await signRefreshToken(payload),
      },
    },
  }));
});

/**
 *  Router: auth
 */
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);

router.get("/auth/refreshtoken", refreshToken);

/**
 * Router: user
 */
router.get("/me", verifyToken, (req, res) => {
  res.json({
    status: "success",
    msg: "OK",
    data: req.user,
  });
});

module.exports = router;
