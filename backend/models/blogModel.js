const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    imageBigUrl: {
      type: String,
    },
    imageThumbUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema, "blogs");
