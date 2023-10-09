const { genRoleIdWithPre } = require("../../../utils/gen.util");
const logger = require("../../../utils/logger");
const { ApiError, BadRequestError } = require("../core/ApiError");
const { _ROLE } = require("../models/role.model");

class RoleService {
  /**
   *
   * @param {*} param0
   * @returns
   */
  static async listRole({
    parentSlug = "",
    slug = "",
    discuss = 0,
    replies,
    limit = 10,
    skip = 0,
  }) {
    try {
      console.log("listComment");
      return [];
    } catch (error) {
      // @ts-ignore
      console.log("Error [listcomment]::", error.message);
      return null;
    }
  }

  /**
   * @param {import('mongoose').Types.ObjectId []} ids
   */
  static async getRoles(ids) {
    try {
      // eslint-disable-next-line array-callback-return
      const filter = ids.map((_id) => ({ _id }));
      const roles = await _ROLE.find({ $or: filter });
      return roles;
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError("[TTT]error.message");
    }
  }

  /**
   * @param {any} code
   */
  static async getByCode(code) {
    try {
      const role = await _ROLE.findOne({ code });
      return role;
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError(error.message);
    }
  }

  /**
   * @param {any} id
   */
  static async getById(id) {
    try {
      const role = await _ROLE.findById({ _id: id });
      return role;
    } catch (error) {
      // @ts-ignore
      throw new BadRequestError(error.message);
    }
  }

  static async createRole({
    author = "",
    code = "",
    key = "",
    description = "",
    notes = "",
  }) {
    try {
      logger.info("[RoleService] createRole::");
      const roleId = genRoleIdWithPre("ka");
      const createdRole = await _ROLE.create({
        author,
        roleId,
        code,
        key,
        description,
        notes,
      });
      return createdRole;
    } catch (error) {
      // @ts-ignore
      logger.info(`ERROR [putComment]::, ${error.message}`);
      return null;
    }
  }

  /**
   * putComment
   * @param {*} param0
   * @returns
   */
  static async putRole({
    isDEL = "NO",
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
      if (isDEL === "YES") {
        const deletedRoles = await _ROLE.findOneAndDelete({ roleId });
        return deletedRoles;
      }

      const filter = { roleId };
      const update = { roleId, code, key, description, notes };
      // const putRole = await _ROLE.findOneAndUpdate(filter, update, {
      //   new: true,
      //   upsert: true, // Make this update into an upsert
      // });

      const putRole = await _ROLE.create({
        roleId,
        code,
        key,
        description,
        notes,
      });
      return putRole;
    } catch (error) {
      // @ts-ignore
      logger.info(`ERROR [putComment]::, ${error.message}`);
      return null;
    }
  }

  /**
   * Delete role with roleId
   * @param {*} roleId
   * @returns
   */
  static async deleteRole(roleId) {
    try {
      const deletedRoles = await _ROLE.findOneAndDelete({ roleId });
      logger.error(`ERROR [deleteRole]:: ${deletedRoles}`);
      return deletedRoles;
    } catch (error) {
      // @ts-ignore
      logger.error(`ERROR [deleteRole]:: ${error.message}`);
      return null;
    }
  }
}

module.exports = RoleService;
