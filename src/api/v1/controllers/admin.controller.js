const logger = require('../../../utils/logger');
const { successHandler } = require('../core/ApiResponse');
const { BadRequestError } = require('../core/http-error');
const RoleService = require('../services/role.service');

module.exports = {
  /**
   * createRoleHandler
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  createRoleHandler: async (req, res, next) => {
    logger.info(`currentRoleCodes:: ${req.currentRoleCodes}`);
    const role = await RoleService.createRole(req.dataFilter);
    if (!role) {
      return next(new BadRequestError());
    }

    return res.json(successHandler({ results: role }));
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  addRoleHanddler: async (req, res, next) => {
    logger.info(JSON.stringify(req.dataFilter));
    const role = await RoleService.putRole(req.dataFilter);

    if (!role) {
      return next(new BadRequestError());
    }

    return res.json(successHandler({ results: role }));
  },

  /**
   * assignRoles
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   */
  assignRoles: async (req, res) => {
    console.log('test');

    return res.json(successHandler({ results: 'OK' }));
  },

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deleteRoleHandler: async (req, res, next) => {
    const del_role = await RoleService.deleteRole(req.params.role_id);

    if (!del_role) {
      return next(new BadRequestError('Cannot delete this role.'));
    }

    return res.json(successHandler({ results: del_role }));
  },
};
