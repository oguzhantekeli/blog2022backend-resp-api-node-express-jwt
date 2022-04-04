const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getMyBlogs,
  getBlog,
  setBlog,
  updateBlog,
  updateUserBlogs,
  deleteBlog,
  getCategories,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getBlogs)
  .post(protect, setBlog)
  .put(protect, updateUserBlogs);
router.route("/categories").get(getCategories);
router.route("/myblogs").get(protect, getMyBlogs);
router
  .route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)
  .get(getBlog);

module.exports = router;
