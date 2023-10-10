const logger = require("../../../utils/logger");
const { _COMMENT } = require("../models/comment.model");

class CommentService {
  /**
   *
   * @param {*} param0
   * @returns
   */
  static async listComment({
    parent_slug = "",
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
      console.log("Error [listcomment]::", error.message);
      return null;
    }
  }

  /**
   * putComment
   * @param {*} param0
   * @returns
   */
  static async putComment({
    isDEL = "NO",
    discuss_id = 0,
    text = "",
    parent_slug = "",
    slug = 1000,
    author = "",
    posted = new Date(),
  }) {
    //
    try {
      console.log("[CommentService] putComment");
      if (isDEL === "YES") {
        await _COMMENT.deleteMany();
      }
      // task 1: create full_slug = postId + slug
      const full_slug = `${posted.toISOString()}:${slug}`;
      const newComment = await _COMMENT.create({
        parent_slug,
        discuss_id,
        text,
        full_slug,
        slug,
        author,
      });
      return newComment;
    } catch (error) {
      logger.error(`ERROR [putComment]::, ${error.message}`);
      return error;
    }
  }
}

module.exports = CommentService;
