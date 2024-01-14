const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const TransactionService = require("../services/__controller__.service");

module.exports = {
  get__controller__ByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const __controller__ = await __controller__Service.getById(req.params.id);

    if (!__controller__)
      throw new BadRequestError(
        `Khong tim thay __controller__ voi id: ${req.params.id}`
      );

    new SuccessResponse("success", __controller__).send(res);
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
   * delete__controller__Handler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  delete__controller__Handler: async (req, res, next) => {
    const srv = await __controller__Service.deleteTransaction(req.params.id);

    if (!srv) {
      return next(new BadRequestError("Cannot delete this ..."));
    }

    return new SuccessResponse("success", {}).send(res);
  },
};
