//todo update delete actions needs user authentication

const asyncHandler = require("express-async-handler");
const { Blog } = require("../models/blogModel");
const { Category } = require("../models/blogModel");
const Comment = require("../models/commentModel");

//desc get categories.
//route /api/blogs/categories
// access public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

//desc get all blogs
//route /api/blogs
// access private/(public before auth)
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

//desc get single blog
//route /api/blog/:id
// access private/(public before auth)
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog Not Found");
  }
  res.status(200).json({
    id: blog._id,
    title: blog.title,
    text: blog.text,
    author: blog.author,
    status: blog.status,
    updatedAt: blog.updatedAt,
    imageBigUrl: blog.imageBigUrl,
    imageThumbUrl: blog.imageThumbUrl,
    category: blog.category,
    tags: blog.tags,
  });
});

//desc create blog
//route /api/blogs
// access private/(public before auth)
const setBlog = asyncHandler(async (req, res) => {
  if (
    !req.body.category ||
    !req.body.authorId ||
    !req.body.authorName ||
    !req.body.title ||
    !req.body.status
  ) {
    res.status(400);
    throw new Error("please add all required fields");
  }
  const blog = await Blog.create({
    authorId: req.body.authorId,
    author: req.body.authorName,
    title: req.body.title,
    text: req.body.blogtext,
    imageBigUrl: req.body.blogImage,
    imageThumbUrl: req.body.blogImage,
    category: req.body.category,
    tags: req.body.tags,
    status: req.body.status,
  });

  res.status(200).json({
    id: blog._id,
    title: blog.title,
    text: blog.text,
    author: blog.author,
    updatedAt: blog.updatedAt,
    imageBigUrl: blog.imageBigUrl,
    imageThumbUrl: blog.imageThumbUrl,
    category: blog.category,
    tags: blog.tags,
    status: blog.status,
  });
});

//desc update blog
//route /api/blogs:id
// access private/(public before auth)
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.authorId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthenticated action");
  }

  if (!blog) {
    res.status(400);
    throw new Error("blog not found");
  }
  if (!req.body.title || !req.body.text || !req.body.category) {
    res.status(400);
    throw new Error("Required fiedls must be set");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    id: updatedBlog._id,
    title: updatedBlog.title,
    text: updatedBlog.text,
    author: updatedBlog.author,
    email: updatedBlog.email,
    registered: updatedBlog.registered,
    imageBigUrl: updatedBlog.imageBigUrl,
    imageThumbUrl: updatedBlog.imageThumbUrl,
    category: updatedBlog.category,
    tags: updatedBlog.tags,
  });
});

const updateUserBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.updateMany(
    { author: req.body.oldUserName },
    { author: req.body.newUserName }
  );
  if (blogs) {
    res
      .status(200)
      .json({
        "updated?": blogs.acknowledged,
        "items count:": blogs.modifiedCount,
      });
  }
});

//desc delete blog
//route /api/blogs/:id
// access private/(public before auth)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.authorId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthenticated action,impossile...");
  }
  if (!blog) {
    res.status(400);
    throw new Error("blog not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthenticated action,no valid token");
  }
  await blog.remove();
  res.status(200).json({ message: `blog ${blog.title} deleted` });
});

module.exports = {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  updateUserBlogs,
  deleteBlog,
  getCategories,
};
