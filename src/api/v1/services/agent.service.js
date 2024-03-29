const { randomUUID } = require("node:crypto");
const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");
const { _AGENT } = require("../models/agent.model");

class AgentService {
  /**
   *
   * @param {*} param
   * @returns
   */
  static async list() {
    try {
      logger.info("[Service] list sevice");
      const agents = await _AGENT.find();
      return agents;
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError(">>", error.message);
    }
  }

  /**
   * func: create
   * @param {*} param
   * @returns
   */
  static async create(data) {
    if (!data) return null;
    try {
      const agentId = randomUUID();
      const newAgent = {};
      Object.assign(newAgent, data, { agentId });
      return await _AGENT.create(newAgent);
    } catch (error) {
      logger.error(`ERROR [Service:createAgent]::, ${error.message}`);
      // return null;
      throw new BadRequestError(error.message);
    }
  }

  /**
   * putComment
   * @param {*} param0
   * @returns
   */
  static async update({
    roleId = "",
    code = "",
    key = "",
    description = "",
    notes = "",
  }) {
    //
    try {
      logger.info("[Service] updata::");

      // const encode =

      const filter = { roleId };
      const update = { roleId, code, key, description, notes };
      // const putRole = await _ROLE.findOneAndUpdate(filter, update, {
      //   new: true,
      //   upsert: true, // Make this update into an upsert
      // });

      // const putData = await MODEL.create({
      //   Id,
      //   code,
      //   key,
      //   description,
      //   notes,
      // });
      return "updateData";
    } catch (error) {
      // @ts-ignore
      logger.info(`ERROR [Service]:: updateData, ${error.message}`);
      // return null;
      // @ts-ignore
      throw new BadRequestError("###", error.message);
    }
  }

  /**
   * Delete role with roleId
   * @param {*} roleId
   * @returns
   */
  static async deleteRole(roleId) {
    try {
      // const deletedData = await MODEL.findOneAndDelete({ Id });
      logger.info(`call service del`);
      return "deletedData";
    } catch (error) {
      // @ts-ignore
      logger.error(`ERROR [deleteRole]:: ${error.message}`);
      return null;
    }
  }
}

module.exports = AgentService;
