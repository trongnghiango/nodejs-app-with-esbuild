const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const PointService = require("../services/point.service");

module.exports = {
  getPointByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const point = await PointService.getById(req.params.id);

    if (!point)
      throw new BadRequestError(
        `Khong tim thay point voi id: ${req.params.id}`
      );

    new SuccessResponse("success", point).send(res);
  }),
  getPointsHandler: asyncHandler(async (req, res) => {
    logger.debug(`[getPointsHandler]:[query]:: ${JSON.stringify(req.query)}`);
    const roles = await PointService.list(req.query);
    if (!roles) throw new BadRequestError();
    new SuccessResponse("success", roles).send(res);
  }),
  //
  createPointHandler: asyncHandler(async (req, res) => {
    // 1. Validate
    const point = await PointService.create(req.dataFilter || req.body);
    if (!point) {
      throw new BadRequestError("[role] Bad Request");
    }

    new SuccessResponse("Success", point).send(res);
  }),

  /**
   * deletepointHandler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deletePointHandler: async (req, res, next) => {
    const srv = await PointService.delete(req.params.id);

    if (!srv) {
      return next(new BadRequestError("Cannot delete this ..."));
    }

    return new SuccessResponse("success", {}).send(res);
  },
};
