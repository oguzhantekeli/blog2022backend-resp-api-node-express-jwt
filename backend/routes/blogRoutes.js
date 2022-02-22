const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getBlogs).post(setBlog);
router
  .route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)
  .get(protect, getBlog);

module.exports = router;
