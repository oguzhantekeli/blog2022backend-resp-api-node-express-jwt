const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
  getCategories,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getBlogs).post(protect, setBlog);
router.route("/categories").get(getCategories);
router
  .route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)
  .get(getBlog);

module.exports = router;
