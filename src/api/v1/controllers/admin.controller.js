const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const ApiKeyService = require("../services/apikey.service");
const RoleService = require("../services/role.service");
const { findUserByUsername } = require("../services/user.service");

module.exports = {
  getRoleByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const role = await RoleService.getById(req.params.id);

    if (!role)
      throw new BadRequestError(`Khong tim thay role voi id: ${req.params.id}`);

    new SuccessResponse("success", { results: role }).send(res);
  }),
  //
  createRoleHandler: asyncHandler(async (req, res) => {
    logger.info(`currentRoleCodes:: ${req.currentRoleCodes}`);
    const role = await RoleService.createRole(req.dataFilter);
    if (!role) {
      // return next(new BadRequestError());
      throw new BadRequestError("test badrequest");
    }

    new SuccessResponse("success", { results: role }).send(res);
  }),
  //
  addRoleHanddler: async (req, res, next) => {
    logger.info(JSON.stringify(req.dataFilter));
    const role = await RoleService.putRole(req.dataFilter);

    if (!role) {
      throw new BadRequestError("role...");
    }

    new SuccessResponse("success", { results: role }).send(res);
  },

  /**
   * assignRoles
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   */
  assignRoles: async (req, res) => {
    logger.info("test");

    new SuccessResponse("success", { results: "OK" }).send(res);
  },

  /**
   * deleteRoleHandler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deleteRoleHandler: async (req, res, next) => {
    const del_role = await RoleService.deleteRole(req.params.role_id);

    if (!del_role) {
      return next(new BadRequestError("Cannot delete this role."));
    }

    return new SuccessResponse("success", { results: del_role }).send(res);
  },

  createApiKeyHandler: asyncHandler(async (req, res, next) => {
    const data = req.body;
    // const {}
    logger.info(`currentuser:: ${Array.isArray(data.permissions)}`);
    const user = await findUserByUsername(req.user.username);
    data.client = user;
    const newApiKey = await ApiKeyService.create(data);
    if (!newApiKey) throw new BadRequestError("Cannot create api key");

    new SuccessResponse("Success", { results: newApiKey }).send(res);
  }),
};
