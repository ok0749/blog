const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const Tag = require("../models/tags");

function createPostAndRedirect() {
  return async (req, res) => {
    try {
      let post;
      if (req.params.id !== undefined) {
        post = await Post.findById(req.params.id);
      } else {
        post = new Post();
      }
      const { tag, title, description, markdown } = req.body;
      post.title = title;
      post.description = description;
      post.markdown = markdown;
      post.author = req.session.user.id;
      post.tag = tag;
      post = await post.save();
      await Tag.findOneAndUpdate(
        { posts: post.id },
        { $pull: { posts: post.id } }
      );
      await Tag.findOneAndUpdate({ name: tag }, { $push: { posts: post.id } });
      await User.findByIdAndUpdate(req.session.user.id, {
        $push: { posts: post.id },
      });
      res.redirect(`/posts/${post.id}`);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  };
}

// 새 글 작성 페이지
async function newPage(req, res) {
  res.locals.method = "";
  try {
    const tags = await Tag.find().sort();
    res.render("edit", { post: new Post(), tags });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

// 새 글 저장
const createPost = createPostAndRedirect();

// 각 글 페이지
async function postPage(req, res) {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("author", ["name", "avatar"]);
    const comments = await Comment.find({ post: id })
      .populate("author", ["name", "avatar"])
      .sort({ createdAt: "desc" });
    res.render("post", { post, comments });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

// 각 글 수정 페이지
async function editPage(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("author", [
      "name",
      "avatar",
    ]);
    const tags = await Tag.find().sort();
    res.locals.method = `${post.id}?_method=PUT`;
    if (req.session.user.id === post.author.id) {
      return res.render("edit", { post, tags });
    }
    res.render("post", { post, tags });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

// 수정 글 저장
const updatePost = createPostAndRedirect();

// 글 삭제
async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("author", [
      "name",
      "avatar",
    ]);
    if (req.session.user.id === post.author.id) {
      await Comment.deleteMany({ id: post.comments });
      await Tag.updateOne({ name: post.tag }, { $pull: { posts: post.id } });
      await User.findByIdAndUpdate(req.session.user.id, {
        $pull: { posts: post.id, comments: { $in: post.comments } },
      });
      await post.deleteOne();
      return res.redirect("/");
    }
    res.render("post", { post });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  newPage,
  createPost,
  postPage,
  editPage,
  updatePost,
  deletePost,
};
