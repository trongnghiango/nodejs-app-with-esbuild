const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { SuccessResponse } = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const itemService = require("../services/item.service");

module.exports = {
  getItemByIdHandler: asyncHandler(async (req, res) => {
    // 1. check validation in validator midleware
    // 2. call service get by id
    const item = await itemService.getById(req.params.id);

    if (!item)
      throw new BadRequestError(`Khong tim thay item voi id: ${req.params.id}`);

    return new SuccessResponse("success", item).send(res);
  }),
  getItemsHandler: asyncHandler(async (req, res) => {
    logger.debug(
      `[getTransactionsHandler]:[query]:: ${JSON.stringify(req.query)}`
    );
    const roles = await itemService.list(req.query);
    if (!roles) throw new BadRequestError();
    return new SuccessResponse("success", roles).send(res);
  }),
  //
  createItemHandler: asyncHandler(async (req, res) => {
    logger.info(
      `currentTransactionCodes:: ${req.currentTransactionCodes} , datafilter:: ${req.dataFilter}`
    );
    const role = await itemService.create(req.dataFilter || req.body);
    if (!role) {
      throw new BadRequestError("[role] Bad Request");
    }

    return new SuccessResponse("Success", role).send(res);
  }),
  //
  addItemHandler: async (req, res, next) => {
    logger.info(JSON.stringify(req.dataFilter));
    const role = await itemService.update(req.dataFilter || req.body);

    if (!role) {
      throw new BadRequestError("role...");
    }

    return new SuccessResponse("success", role).send(res);
  },

  /**
   * deleteitemHandler
   * desc: yeu cau quyen admin toi cao
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  deleteItemHandler: async (req, res, next) => {
    const srv = await itemService.deleteTransaction(req.params.id);

    if (!srv) {
      throw new BadRequestError("Cannot delete this ...");
    }

    return new SuccessResponse("success", {}).send(res);
  },
};
