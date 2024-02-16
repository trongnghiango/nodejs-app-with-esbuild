const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const log = require("@/utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const {
  BadRequestError,
  InternalError,
  AuthFailureError,
} = require("../core/ApiError");
const { createTokens } = require("../helpers/auth.helper");

const { signAccessToken, signRefreshToken } = require("../middleware/jwt");
const RoleService = require("../services/role.service");

const userService = require("../services/user.service");
const KeystoreService = require("../services/keystore.service");
const { objectFilter } = require("../helpers/utils");

module.exports = {
  /**
   * signUp
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  signUp: async (req, res) => {
    // checked in middleware validattor
    const { userId, username, phone, displayName, email, password } = req.body;

    // check user co ton tai khong?
    const checkUserExist = await userService.isExistedUser(userId);
    if (checkUserExist) {
      throw new BadRequestError("checkUserExist");
    }

    // check email co ton tai khong?
    const existEmail = await userService.isExistedEmail(email);
    if (existEmail) {
      throw new BadRequestError("existEmail");
    }

    // ma hoa password
    const passwordHash = await bcrypt.hash(password, 10);

    // auto assign role GUEST
    const role = await RoleService.getByCode("GUEST");
    if (!role) throw new BadRequestError("Error get role for register");

    // call service create new user
    const newUser = {
      userId,
      phone,
      name: displayName,
      displayName,
      username,
      email,
      password: passwordHash,
      roles: [role._id],
    };
    log.info(`Kon Testing::`);

    const user = await userService.createNewUser(newUser);
    if (!user) {
      throw new BadRequestError("create new user fail.");
    }

    const payload = {
      userId,
      name: displayName,
      username,
      email,
      roles: ["GUEST", "ADMIN_LV", "MANAGER"],
    };

    const tokens = {
      accessToken: await signAccessToken(payload),
      refreshToken: await signRefreshToken(payload),
    };

    // return new user info come back client
    new SuccessResponse("success", {
      results: {
        user,
        tokens,
      },
    }).send(res);
  },

  /**
   * signIn
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  signIn: async (req, res) => {
    const { username, password } = req.body;

    // 1. Tim xem co user trong database ko?
    const user = await userService.findUserByUsername(username);
    if (!user) {
      log.error(`Not found user by username: "${username}"`);
      throw new BadRequestError(`Not found user by username: "${username}"`);
    }

    // 2. Check xem co nhap Pass tu nguoi dung ko?
    if (!password) {
      log.error(`User không nhập password.`);
      throw new BadRequestError("Lỗi! Người dùng không nhập password.");
    }

    // 3. Check match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      log.info(`[Logging]:: WrongPass!!`);
      throw new BadRequestError("Authentication failure");
    }

    log.warn(`[Array]:roleId:: ${JSON.stringify(user, null, 2)}`);
    const roles = await RoleService.getRolesByIdsArray(user.roles);
    log.warn(`[Array]:roleId:out:: ${JSON.stringify(roles, null, 2)}`);
    if (!roles) throw new BadRequestError("User roles not found.");
    const strRoles = roles.map((role) => role.roleId);
    log.info(`[Array]:roleId:: ${strRoles}`);

    const sub = {
      userId: user._id,
      // username: user.username,
      roles: strRoles,
    };

    // Tao va save Luu keystore vao db
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    // wait for create keystore
    await KeystoreService.create(sub.userId, accessTokenKey, refreshTokenKey);

    const tokens = await createTokens(sub, accessTokenKey, refreshTokenKey);
    if (!tokens) throw new InternalError();
    log.debug(`[Logging]:: createdTokens:: ${JSON.stringify(tokens, null, 2)}`);

    // finally, return back client
    const result = objectFilter(user, [
      "userId",
      "username",
      "email",
      "enabled",
    ]);
    return new SuccessResponse("Success", { user: result, tokens }).send(res);
  },

  /**
   * refreshToken
   * @param {*} req
   * @param {*} res
   */
  refreshToken: async (req, res, _next) => {
    const { user: current } = req;
    log.info(`CurrentUser:: ${JSON.stringify(current)}`);

    const user = await userService.getUserById(current.userId);

    if (!user) throw new AuthFailureError("LOI TRUY CAP");

    const roles = await RoleService.getRolesByIdsArray(user.roles);
    log.warn(`[Array]:roleId:out:: ${JSON.stringify(roles, null, 2)}`);
    if (!roles) throw new BadRequestError("User roles not found.");
    const strRoles = roles.map((role) => role.roleId);
    log.info(`[Array]:roleId:: ${strRoles}`);

    const sub = {
      userId: user._id,
      // username: user.username,
      roles: strRoles,
    };

    // Tao va save Luu keystore vao db
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    // wait for create keystore
    await KeystoreService.create(
      user.userId || user._id,
      accessTokenKey,
      refreshTokenKey
    );

    const tokens = await createTokens(sub, accessTokenKey, refreshTokenKey);
    if (!tokens) throw new InternalError();

    return new SuccessResponse("Success", tokens).send(res);
  },
};
