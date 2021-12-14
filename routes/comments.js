const express = require("express");
const authorizationMiddleware =
  require("../middlewares").authorizationMiddleware;
const commentController = require("../controller/comments");

const router = express.Router();

// 좋아요
router.post("/like/:id", authorizationMiddleware, commentController.like);

// 댓글 저장
router.post("/:id", authorizationMiddleware, commentController.saveComment);

// 댓글 삭제
router.delete("/:id", authorizationMiddleware, commentController.deleteComment);

// 댓글 수정
router.put("/:id", authorizationMiddleware, commentController.saveEditComment);

module.exports = router;
