const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const TransactionService = require("../services/point.service");

module.exports = {
  getpointByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const point = await pointService.getById(req.params.id);

    if (!point)
      throw new BadRequestError(
        `Khong tim thay point voi id: ${req.params.id}`
      );

    new SuccessResponse("success", point).send(res);
  }),
  getTransactionsHandler: asyncHandler(async (req, res) => {
    logger.debug(
      `[getTransactionsHandler]:[query]:: ${JSON.stringify(req.query)}`
    );
    const roles = await TransactionService.list(req.query);
    if (!roles) throw new BadRequestError();
    new SuccessResponse("success", roles).send(res);
  }),
  //
  createTransactionHandler: asyncHandler(async (req, res) => {
    logger.info(
      `currentTransactionCodes:: ${req.currentTransactionCodes} , datafilter:: ${req.dataFilter}`
    );
    const role = await TransactionService.create(req.dataFilter || req.body);
    if (!role) {
      throw new BadRequestError("[role] Bad Request");
    }

    new SuccessResponse("Success", role).send(res);
  }),
  //
  addTransactionHandler: async (req, res, next) => {
    logger.info(JSON.stringify(req.dataFilter));
    const role = await TransactionService.update(req.dataFilter || req.body);

    if (!role) {
      throw new BadRequestError("role...");
    }

    new SuccessResponse("success", role).send(res);
  },

  /**
   * deletepointHandler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deletepointHandler: async (req, res, next) => {
    const srv = await pointService.deleteTransaction(req.params.id);

    if (!srv) {
      return next(new BadRequestError("Cannot delete this ..."));
    }

    return new SuccessResponse("success", {}).send(res);
  },
};
