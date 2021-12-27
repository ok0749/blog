const Post = require("../models/posts");
const Tag = require("../models/tags");
const config = require("../config");

async function getAllPost(req, res) {
  const posts = res.pagination.results;
  const previous = res.pagination.previous;
  const next = res.pagination.next;
  const pages = res.pagination.pages;
  const current = res.pagination.current;
  const tags = await Tag.find().sort({ name: "asc" });
  const masterId = config.master.id;

  res.render("index", {
    posts,
    tags,
    previous,
    next,
    current,
    pages,
    masterId,
  });
}

async function getAllPostByTag(req, res) {
  const tag = await Tag.findById(req.params.tagId);
  const posts = await Post.find({ _id: { $in: tag.posts } })
    .sort({ createdAt: "desc" })
    .populate("author", ["name", "avatar"]);
  const tags = await Tag.find().sort({ name: "asc" });
  res.render("index", { posts, tags });
}

module.exports = {
  getAllPost,
  getAllPostByTag,
};
