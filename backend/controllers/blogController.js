const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

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
  const comments = await Comment.find({ blogId: req.params.id });
  res.status(200).json({ blog, comments });
});

//desc create blog
//route /api/blogs
// access private/(public before auth)
const setBlog = asyncHandler(async (req, res) => {
  if (!req.body.category || !req.body.authorId || !req.body.title) {
    res.status(400);
    throw new Error("please add all required fields");
  }
  const blog = await Blog.create({
    authorId: req.body.authorId,
    title: req.body.title,
    text: req.body.text,
    imageBigUrl: req.body.imageBigUrl,
    imageThumbUrl: req.body.imageThumbUrl,
    category: req.body.category,
    tags: req.body.tags,
    commentsId: req.body.commentsId,
  });

  res.status(200).json(blog);
});

//desc update blog
//route /api/blogs:id
// access private/(public before auth)
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("blog not found");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

//desc delete blog
//route /api/blogs/:id
// access private/(public before auth)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error("blog not found");
  }
  await blog.remove();
  res.status(200).json({ msg: `blog ${blog.title} deleted` });
});

module.exports = {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
};
