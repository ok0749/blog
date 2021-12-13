const express = require("express");
const authorizationMiddleware =
  require("../middlewares").authorizationMiddleware;
// const Post = require("../models/posts");
// const postController = require("../controller/posts");
// const authorizationMiddleware =
//   require("../middlewares").authorizationMiddleware;
const commentController = require("../controller/comments");

const router = express.Router();

// 댓글 저장
router.post("/:id", authorizationMiddleware, commentController.saveComment);

// 댓글 수정

// 댓글 삭제

module.exports = router;
