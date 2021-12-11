var express = require("express");
const Post = require("../models/posts");
const postController = require("../controller/posts");

var router = express.Router();

// 새 글 쓰기
router.get("/new", postController.newPage);

// 각 글 페이지
router.get("/:id", postController.postPage);

// 글 수정
router.get("/edit/:id", postController.editPost);

// 새 글 저장
router.post("/", postController.savePost);

// 수정된 글 저장
router.put("/:id", postController.saveEditPost);

module.exports = router;
