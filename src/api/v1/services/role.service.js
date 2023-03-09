const { genRoleIdWithPre } = require('../../../utils/gen.util');
const logger = require('../../../utils/logger');
const { _ROLE } = require('../models/role.model');

class RoleService {
  /**
   *
   * @param {*} param0
   * @returns
   */
  static async listRole({
    parentSlug = '',
    slug = '',
    discuss = 0,
    replies,
    limit = 10,
    skip = 0,
  }) {
    try {
      console.log('listComment');
      return [];
    } catch (error) {
      console.log('Error [listcomment]::', error.message);
      return null;
    }
  }

  static async createRole({
    author = '',
    code = '',
    key = '',
    description = '',
    notes = '',
  }) {
    try {
      logger.info('[RoleService] createRole::');
      const roleId = genRoleIdWithPre('ka');
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
    isDEL = 'NO',
    roleId = '',
    code = '',
    key = '',
    description = '',
    notes = '',
  }) {
    //
    try {
      logger.info('[RoleService] putRole');

      // const encode =
      if (isDEL === 'YES') {
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
      logger.info(`ERROR [putComment]::, ${error.message}`);
      return null;
    }
  }

  static async deleteRole(roleId) {
    try {
      const deletedRoles = await _ROLE.findOneAndDelete({ roleId });
      logger.error(`ERROR [deleteRole]:: ${deletedRoles}`);
      return deletedRoles;
    } catch (error) {
      logger.error(`ERROR [deleteRole]:: ${error.message}`);
      return null;
    }
  }
}

module.exports = RoleService;
