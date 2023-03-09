const logger = require('../../../utils/logger');
const { successHandler, errorHandler } = require('../core/ApiResponse');

const { signAccessToken, signRefreshToken } = require('../middleware/jwt');

const userService = require('../services/user.service');

module.exports = {
  /**
   * signUp
   * @param {*} req
   * @param {*} res
   */
  signUp: async (req, res) => {
    const { userId, name, email, password } = req.body;

    // check validation
    // checked in middleware validattor

    const checkUserExist = await userService.isExistedUser(userId);
    if (checkUserExist) {
      res.json(errorHandler('checkUserExist'));
    }

    const existEmail = await userService.isExistedEmail(email);
    if (existEmail) {
      res.json(errorHandler('existEmail'));
    }

    // call service create new user
    const newUser = { userId, name, email, password };
    logger.info(`Kon Testing::`);

    const user = await userService.createNewUser(newUser);

    const payload = {
      userId,
      name,
      email,
      roles: ['GUEST', 'ADMIN_LV', 'MANAGER'],
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
  },

  /**
   * signIn
   * @param {*} req
   * @param {*} res
   */
  async signIn(req, res) {
    res.status(200).json(
      successHandler({
        results: ['Khabd', 'teo teo teo'],
      })
    );
  },

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
      email: 'hsfhkl',
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    res.json(successHandler({ results: { accessToken, refreshToken } }));
  },
};
