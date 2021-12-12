const Post = require("../models/posts");

function savePostAndRedirect(path) {
  return async (req, res) => {
    let post;
    if (req.params.id !== "undefined") {
      post = await Post.findById(req.params.id);
    } else {
      post = new Post();
    }
    const { title, description, markdown } = req.body;
    post.title = title;
    post.description = description;
    post.markdown = markdown;
    post.author = req.session.user.id;
    try {
      post = await post.save();
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
      res.render(`${path}`, { post });
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
