const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const TransactionService = require("../services/transaction.service");
const { findUserByUsername } = require("../services/user.service");

module.exports = {
  getTransactionByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const transaction = await TransactionService.getById(req.params.id);

    if (!transaction)
      throw new BadRequestError(
        `Khong tim thay transaction voi id: ${req.params.id}`
      );

    new SuccessResponse("success", transaction).send(res);
  }),
  getTransactionsHandler: asyncHandler(async (req, res) => {
    logger.debug(
      `[getTransactionsHandler]:[query]:: ${JSON.stringify(req.query)}`
    );
    new SuccessResponse("success", {}).send(res);
  }),
  //
  createTransactionHandler: asyncHandler(async (req, res) => {
    const transaction = await TransactionService.create(
      req.dataFilter || req.body
    );
    if (!transaction) {
      throw new BadRequestError("[transaction] Bad Request");
    }

    new SuccessResponse("Success", transaction).send(res);
  }),
  //
  addTransactionHandler: async (req, res, next) => {
    logger.info(JSON.stringify(req.dataFilter));
    const srv = await TransactionService.put(req.dataFilter || req.body);

    if (!srv) {
      throw new BadRequestError("transaction...");
    }

    new SuccessResponse("success", srv).send(res);
  },

  /**
   * deletetransactionHandler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deleteTransactionHandler: async (req, res, next) => {
    const srv = await TransactionService.delete(req.params.id);

    if (!srv) {
      return next(new BadRequestError("Cannot delete this ..."));
    }

    return new SuccessResponse("success", {}).send(res);
  },
};
