const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
    },
    commentOwnerId: {
      type: String,
      required: true,
    },
    commentOwnerName: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
