const express = require("express");
const router = express.Router();
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.route("/:id").put(updateComment).delete(deleteComment).post(addComment);
//post ->id = blogId
//put&delete -> commentId

module.exports = router;
