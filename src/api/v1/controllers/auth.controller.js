// @ts-ignore
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const logger = require("../../../utils/logger");
const { successHandler } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/http-error");
const { createTokens } = require("../helpers/auth.helper");

const { signAccessToken, signRefreshToken } = require("../middleware/jwt");
const RoleService = require("../services/role.service");

const userService = require("../services/user.service");
const KeystoreService = require("../services/keystore.service");
// const { log } = require('../../../utils/logger');

module.exports = {
  /**
   * signUp
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  signUp: asyncHandler(async (req, res) => {
    // checked in middleware validattor
    const { userId, username, phone, displayName, email, password } = req.body;

    // check user co ton tai khong?
    const checkUserExist = await userService.isExistedUser(userId);
    if (checkUserExist) {
      throw new BadRequestError("Hello con bo cu");
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
    if (!role) throw new BadRequestError("Error get get role for register");

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
    logger.info(`Kon Testing::`);

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
    res.json(
      successHandler({
        results: {
          user,
          tokens,
        },
      })
    );
  }),

  /**
   * signIn
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  signIn: asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // 1. Tim xem co user trong database ko?
    const user = await userService.findUserByUsername(username);
    if (!user) {
      logger.error(`Not found user by username: "${username}"`);
      throw new BadRequestError("username chua duoc dang ky...");
    }

    // 2. Check xem co nhap Pass tu nguoi dung ko?
    if (!password) {
      logger.error(`User không nhập password.`);
      throw new BadRequestError("Lỗi! Người dùng không nhập password.");
    }

    // 3. Check match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.info(`[Logging]:: WrongPass!!`);
      throw new BadRequestError("Authentication failure");
    }

    const roles = await RoleService.getRoles(user.roles);
    // const roles = user.roles.map(
    //   async (roleId) => {
    //     return await RoleService.getById(roleId);
    //   }
    // );
    // await asyncLoop([
    //   await RoleService.getById(user.roles[0]),
    //   // @ts-ignore
    //   await RoleService.getById(user.roles[1]),
    // ]);

    if (!roles) throw new BadRequestError("vi sao kha bo do");
    const strRoles = roles.map((role) => role.code);
    logger.info(strRoles);

    const sub = {
      userId: user.userId,
      username: user.username,
      roles: strRoles,
    };
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    // wait for create keystore
    await KeystoreService.create(user, accessTokenKey, refreshTokenKey);

    const tokens = await createTokens(sub, accessTokenKey, refreshTokenKey);
    logger.info(`[Logging]:: createdTokens:: ${tokens}`);

    //
    // const tokens = {
    //   accessToken: await signAccessToken(payload),
    //   refreshToken: await signRefreshToken(payload),
    // };

    res.status(200).json(
      successHandler({
        results: {
          user,
          tokens,
        },
      })
    );
  }),

  /**
   * refreshToken
   * @param {*} req
   * @param {*} res
   */
  async refreshToken(req, res) {
    // const { user } = req;
    // console.log({ user });
    const payload = {
      userId: 4,
      email: "hsfhkl",
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    res.json(successHandler({ results: { accessToken, refreshToken } }));
  },
};
