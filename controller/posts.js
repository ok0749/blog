const Post = require("../models/posts");

function savePostAndRedirect(path) {
  return async (req, res) => {
    const { title, description, markdown } = req.body;
    let post = req.post;
    post.title = title;
    post.description = description;
    post.markdown = markdown;
    post.author = req.session.user.id;
    try {
      post = await post.save();
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      res.render(`posts/${path}`, { post });
    }
  };
}

module.exports = {
  newPage: function (req, res) {
    res.render("new", { post: new Post() });
  },
  savePost: savePostAndRedirect("new"),

  postPage: async function (req, res) {
    const id = req.params.id;
    const post = await Post.findById(id).populate("author", "name");
    res.render("post", { post });
  },

  editPost: async function (req, res) {
    const post = await Post.findById(req.params.id).populate("author");
    if (req.session.user.id === post.author.id)
      return res.render("edit", { post });
    res.render("post", { post });
  },

  saveEditPost: savePostAndRedirect("edit"),

  deletePost: async function (req, res) {
    const post = await Post.findById(req.params.id).populate("author");
    if (req.session.user.id === post.author.id) {
      await Post.findByIdAndDelete(req.params.id);
      return res.redirect("/");
    }
    res.render("post", { post });
  },
};
