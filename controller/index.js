const Post = require("../models/posts");
const Tag = require("../models/tags");

async function getAllPost(req, res) {
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .populate("author", ["name", "avatar"]);

  const tags = await Tag.find().sort({ name: "asc" });
  res.render("index", { posts, tags });
}

async function getTagPost(req, res) {
  const tag = await Tag.findById(req.params.id);
  const posts = await Post.find({ _id: { $in: tag.posts } })
    .sort({ createdAt: "desc" })
    .populate("author", ["name", "avatar"]);
  const tags = await Tag.find().sort({ name: "asc" });
  res.render("index", { posts, tags });
}

module.exports = {
  getAllPost,
  getTagPost,
};
