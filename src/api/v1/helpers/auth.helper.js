const { Types } = require('mongoose');
const JWT = require('../middleware/jwt');
const logger = require('../../../utils/logger');
const { tokenInfo } = require('../../../../config/env.config');
const { InternalError, AuthFailureError } = require('../core/http-error');

const getAccessToken = (/** @type {string} */ authorization) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};

const validateTokenData = (
  /** @type {{ iss: any; sub: any; aud: any; prm: any; }} */ payload
) => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !payload.sub
  )
    throw new AuthFailureError('Invalid Access Token');
  return true;
};

const createTokens = async (
  /** @type {Object} */ user,
  /** @type {any} */ accessTokenKey,
  /** @type {any} */ refreshTokenKey
) => {
  logger.debug('Start created');
  const accessToken = await JWT.encode({
    iss: tokenInfo.issuer,
    aud: tokenInfo.audience,
    sub: JSON.stringify(user),
    prm: accessTokenKey,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + tokenInfo.accessTokenValidity,
  });
  // {
  //   tokenInfo.issuer,
  //   tokenInfo.audience,
  //   user,
  //   accessTokenKey,
  //   tokenInfo.accessTokenValidity
  // }

  logger.info(`[Input to createTokens]${{ tokenInfo, user }}`);

  if (!accessToken) throw new InternalError('[ERR] createTokens fail!');

  const refreshToken = await JWT.encode({
    iss: tokenInfo.issuer,
    aud: tokenInfo.audience,
    sub: JSON.stringify(user),
    prm: refreshTokenKey,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + tokenInfo.refreshTokenValidity,
  });
  // new JwtPayload(
  //   tokenInfo.issuer,
  //   tokenInfo.audience,
  //   user._id.toString(),
  //   refreshTokenKey,
  //   tokenInfo.refreshTokenValidity
  // )

  if (!refreshToken) throw new InternalError();

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  getAccessToken,
  validateTokenData,
  createTokens,
};