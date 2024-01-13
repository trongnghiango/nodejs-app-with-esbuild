const logger = require("../../../utils/logger");
const { InternalError } = require("../core/ApiError");
const { errorHandler } = require("../core/ApiResponse");
const AgentService = require("../services/agent.service");
const CommentService = require("../services/comment.service");
const schema = require("../validators/comment.validator");

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
    if (!cmt) throw new InternalError();
    res.json(cmt);
  },
  getAgents: async (req, res) => {
    const agents = await AgentService.list()
    if (!agents) throw new InternalError()
    res.json(agents)
  }
};
