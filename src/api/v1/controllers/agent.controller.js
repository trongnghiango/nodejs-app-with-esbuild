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
    if (!newAgent) throw new BadRequestError("LOI TAO AGENT");
    new SuccessResponse("success", { data: newAgent }).send(res);
  }),
  getAgents: asyncHandler(async (req, res) => {
    const agents = await AgentService.list();
    if (!agents) throw new BadRequestError();
    return new SuccessResponse("success", agents).send(res);
  }),
};
