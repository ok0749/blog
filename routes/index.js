var express = require("express");
var router = express.Router();
const indexController = require("../controller/index");
const pagination = require("../middlewares").pagination;
const Post = require("../models/posts");

/* GET home page. */
router.get("/", pagination(Post), indexController.getAllPost);

router.get("/tags/:id", indexController.getTagPost);

module.exports = router;
