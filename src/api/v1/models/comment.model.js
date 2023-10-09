const { Schema } = require("mongoose");
const { conn2 } = require("../databases/init.multi.mongodb");

const commentSchema = new Schema(
  {
    author: { type: Object },
    discuss_id: Number,
    posted: Date,
    text: String,
    parent_slug: String,
    score: Number,
    comment_likes: Array,
    comment_like_num: Number,
    full_slug: String,
  },
  {
    timestamps: true,
  }
);

module.exports._COMMENT = conn2.model("Comment", commentSchema, "comments");
