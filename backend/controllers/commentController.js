const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

//
//
//todo update delete actions needs user authentication
//
//

//get all comments
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

// desc add new comment
// route post /api/comments/:blogId
// access  private
const addComment = asyncHandler(async (req, res) => {
  if (
    !req.body.commentOwnerId ||
    !req.body.commentOwnerName ||
    !req.body.commentText ||
    !req.body.blogId
  ) {
    res.status(400);
    throw new Error("Required fields must be set...");
  }
  const user = User.findById(req.body.commentOwnerId);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found...");
  }
  if (req.user.id !== req.body.commentOwnerId) {
    res.status(401);
    throw new Error("Unauthenticated Action. Login First...");
  }
  const comment = await Comment.create({
    blogId: req.params.id,
    commentOwnerId: req.body.commentOwnerId,
    commentOwnerName: req.body.commentOwnerName,
    commentText: req.body.commentText,
  });
  res.status(200).json({
    id: comment._id,
    blogId: comment.blogId,
    commentOwnerAvatar: user.avatar,
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

module.exports = { getComments, addComment, updateComment, deleteComment };
