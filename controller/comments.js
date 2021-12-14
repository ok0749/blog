const Post = require("../models/posts");
const Comment = require("../models/comments");

// 좋아요
async function like(req, res) {
  // post의 해당 comment의 찾는다
  let comment = await Comment.findById(req.params.id);
  // comment의 like에 해당 유저가 있는지 찾는다
  const isLike = comment.like.includes(req.session.user.id);

  //있으면 제거 없으면 추가
  if (isLike) await comment.updateOne({ $pull: { like: req.session.user.id } });
  else await comment.updateOne({ $push: { like: req.session.user.id } });
  res.redirect(`/posts/${comment.post}`);
}

// 댓글 저장
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

// 댓글 삭제
async function deleteComment(req, res) {
  const comment = await Comment.findById(req.params.id).populate(
    "author",
    "id"
  );

  if (req.session.user.id === comment.author.id) {
    await comment.deleteOne();
    return res.redirect(`/posts/${comment.post}`);
  }
  res.send("delete");
}

// 댓글 수정
async function saveEditComment(req, res) {
  let comment = await Comment.findById(req.params.id);
  try {
    await comment.updateOne({ $set: { content: req.body.editContent } });
    return res.redirect(`/posts/${comment.post}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  saveComment,
  like,
  deleteComment,
  saveEditComment,
};
