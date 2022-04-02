const mongoose = require("mongoose");
const categoriesSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      default: "general",
    },
  },
  { timestamps: true }
);
const blogSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: {
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

const Blog = mongoose.model("Blog", blogSchema, "blogs");
const Category = mongoose.model("Category", categoriesSchema, "categories");
// module.exports = mongoose.model("Blog", blogSchema, "blogs");
// module.exports = mongoose.model("Category", categoriesSchema, "categories");

module.exports = { Blog, Category };
