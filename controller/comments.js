const Post = require("../models/posts");
const Comment = require("../models/comments");

async function saveComment(req, res) {
  let post = await Post.findById(req.params.id);
  let comment = new Comment();

  post.comments.push(comment.id);

  comment.post = req.params.id;
  comment.content = req.body.content.trim();
  comment.author = req.session.user.id;
  try {
    post = await post.save();
    comment = await comment.save();
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect(`/posts/${post.id}`);
  }
}

module.exports = {
  saveComment,
};
