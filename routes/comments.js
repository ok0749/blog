const express = require("express");
const authorizationMiddleware =
  require("../middlewares").authorizationMiddleware;
const commentController = require("../controller/comments");

const router = express.Router();

// 좋아요
router.post(
  "/like/:commentId",
  authorizationMiddleware,
  commentController.handleLike
);

// 댓글 저장
router.post(
  "/:postId",
  authorizationMiddleware,
  commentController.createComment
);

// 댓글 삭제
router.delete(
  "/:commentId",
  authorizationMiddleware,
  commentController.deleteComment
);

// 댓글 수정
router.put(
  "/:commentId",
  authorizationMiddleware,
  commentController.updateComment
);

module.exports = router;
