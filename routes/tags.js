const express = require("express");
const { createTag } = require("../controller/tags");

const router = express.Router();

// tag 추가
router.post("/:id", createTag);

module.exports = router;
