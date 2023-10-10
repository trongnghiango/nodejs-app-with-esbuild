const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");
const { KEYSTORE } = require("../models/keystore.model");

class KeystoreService {
  /**
   *
   * @param {*} param
   * @returns
   */
  static async listTemp({
    parentSlug = "",
    slug = "",
    limit = 10,
    skip = 0,
    page = 1,
  }) {
    try {
      logger.info("call sevice");
      return [];
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError(">>", error.message);
    }
  }

  /**
   * .
   */
  static async create(client, primaryKey, secondaryKey, description = "") {
    logger.info(`[Service] create:: ${client}`);
    try {
      const createdKeystore = await KEYSTORE.create({
        client,
        primaryKey,
        secondaryKey,
        description,
      });
      return createdKeystore;
    } catch (error) {
      // @ts-ignore
      logger.info(`ERROR [createKeystore]::, ${error.message}`);
      // return null;
      // @ts-ignore
      throw new BadRequestError(`###, ${error.message}`);
    }
  }

  /**
   * @param {string} key
   */
  static async findByKey(key) {
    try {
      logger.info("[ApiKeyService] find::");
      const apiKey = await KEYSTORE.findOne({ key });
      return apiKey;
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError(`[ERR] [ApiKeyService] find ${error.message}`);
    }
  }

  /**
   * putComment
   * @param {*} param0
   * @returns
   */
  static async putTemp({
    roleId = "",
    code = "",
    key = "",
    description = "",
    notes = "",
  }) {
    //
    try {
      logger.info("[RoleService] putRole");

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
      return "putData";
    } catch (error) {
      // @ts-ignore
      logger.info(`ERROR [putComment]::, ${error.message}`);
      // return null;
      // @ts-ignore
      throw new BadRequestError(`###, ${error.message}`);
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

module.exports = KeystoreService;
