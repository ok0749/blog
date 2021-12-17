var express = require("express");
const Post = require("../models/posts");
const postController = require("../controller/posts");
const authorizationMiddleware =
  require("../middlewares").authorizationMiddleware;

var router = express.Router();

// 새 글 쓰기
router.get("/new", authorizationMiddleware, postController.newPage);

// 각 글 페이지
router.get("/:id", postController.postPage);

// 각 글 수정 페이지
router.get("/edit/:id", authorizationMiddleware, postController.editPage);

// 새 글 저장
router.post("/", authorizationMiddleware, postController.savePost);

// 수정된 글 저장
router.put("/:id", authorizationMiddleware, postController.saveEditPost);

// 글 삭제
router.delete("/:id", authorizationMiddleware, postController.deletePost);

module.exports = router;
