const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

//
//
//todo update delete actions needs user authentication
//
//

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
  res.status(200).json({
    blogId: comment.blogId,
    commentOwnerId: comment.commentOwnerId,
    commentOwnerName: comment.commentOwnerName,
    commentText: comment.commentText,
  });
});
// desc update comment
// route put /api/comments/:commentId
// access  private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthenticated action");
  }
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthenticated action");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    blogId: updatedComment.blogId,
    commentOwnerId: updatedComment.commentOwnerId,
    commentOwnerName: updatedComment.commentOwnerName,
    commentText: updatedComment.commentText,
  });
});
// desc delete comment
// route delete /api/comments/:commentId
// access  private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthenticated action");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthenticated action");
  }
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
