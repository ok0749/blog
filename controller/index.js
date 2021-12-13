const Post = require("../models/posts");

module.exports = {
  getAllPost: async function (req, res) {
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .populate("author", ["name", "avatar"]);
    res.render("index", { posts });
  },
};
