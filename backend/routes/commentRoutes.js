const express = require("express");
const router = express.Router();
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/:id")
  .put(protect, updateComment)
  .delete(protect, deleteComment)
  .post(protect, addComment);
//post ->id = blogId
//put&delete -> commentId

module.exports = router;
