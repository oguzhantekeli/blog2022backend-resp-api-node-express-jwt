const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

// desc add new comment
// route post /api/comments/:blogId
// access  private
const addComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    blogId: req.params.id,
    commentOwnerId: req.body.commentOwnerId,
    commentOwnerName: req.body.commentOwnerName,
    commentText: req.body.commentText,
  });
  res.status(200).json(comment);
});
// desc update comment
// route put /api/comments/:commentId
// access  private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedComment);
});
// desc delete comment
// route delete /api/comments/:commentId
// access  private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }
  comment.remove();

  res
    .status(200)
    .json(`comment " ${comment.commentText} " deleted successfully.`);
});

module.exports = { addComment, updateComment, deleteComment };
