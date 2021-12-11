const Post = require("../models/posts");

module.exports = {
  newPage: function (req, res) {
    res.render("new", { post: new Post() });
  },
  savePost: async function (req, res) {
    const { title, description, markdown } = req.body;
    let post = new Post({
      title,
      description,
      markdown,
    });
    try {
      post = await post.save();
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
    }
  },

  postPage: async function (req, res) {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.render("post", { post });
  },

  editPost: async function (req, res) {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post });
  },

  saveEditPost: async function (req, res) {
    let post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.description = req.body.description;
    post.markdown = req.body.markdown;
    try {
      post = await post.save();
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
    }
  },
};
