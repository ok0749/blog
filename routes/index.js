const express = require("express");
const indexController = require("../controller/index");
const { pagination } = require("../middlewares");
const Post = require("../models/posts");

const router = express.Router();

/* GET home page. */
router.get("/", pagination(Post), indexController.getAllPost);

router.get("/:tagId", indexController.getAllPostByTag);

module.exports = router;
