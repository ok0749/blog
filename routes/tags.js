const express = require("express");
const Tag = require("../models/tags");

const router = express.Router();

// tag 추가
router.post("/:id", async function (req, res) {
  const tag = new Tag({
    name: req.body.name.trim(),
  });
  await tag.save();
  res.status(200).json({ tag });
});

module.exports = router;
