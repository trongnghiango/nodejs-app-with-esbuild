const logger = require("../../../utils/logger");
const { BadRequestError, InternalError } = require("../core/ApiError");
const {
  SuccessResponse,
  InternalErrorResponse,
} = require("../core/ApiResponse");
const asyncHandler = require("../helpers/asyncHandler");
const AgentService = require("../services/agent.service");
const CommentService = require("../services/comment.service");
// const schema = require("../validators/comment.validator");

module.exports = {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  putComment: async (req, res) => {
    logger.info(`Put Comment ..., ${JSON.stringify(req.body)}`);
    // validation req input
    // const { value, error } = schema.validate(req.body)
    // if (error) {
    //   res.json(errorHandler(error));
    // }
    // logger.info(`CHECK: ${JSON.stringify(error)}`)
    const cmt = await CommentService.putComment(req.body);
    if (!cmt) throw new InternalErrorResponse();
    res.json(cmt);
  },
  createAgent: asyncHandler(async (req, res) => {
    // 1. Validation
    logger.info(JSON.stringify(req.body));

    // 2.
    const newAgent = await AgentService.create(req.body);
    logger.info(newAgent);
    if (!newAgent) return new BadRequestError("LOI TAO AGENT");
    return new SuccessResponse("success", { data: newAgent }).send(res);
  }),
  getAgents: asyncHandler(async (req, res) => {
    const agents = await AgentService.list();
    if (!agents) throw new BadRequestError();
    return new SuccessResponse("success", agents).send(res);
  }),
};
