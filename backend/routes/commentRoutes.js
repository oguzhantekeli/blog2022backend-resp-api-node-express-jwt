const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/:id")
  .get(getComments)
  .put(protect, updateComment)
  .delete(protect, deleteComment)
  .post(protect, addComment);
//post&get ->id = blogId
//put&delete -> commentId

module.exports = router;
