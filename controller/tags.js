const Tag = require("../models/tags");

async function createTag(req, res) {
  const tag = new Tag({
    name: req.body.name.trim(),
  });
  try {
    await tag.save();
    res.status(200).json({ tag });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  createTag,
};
