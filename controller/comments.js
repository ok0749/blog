const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");

// 좋아요
async function handleLike(req, res) {
  try {
    let comment = await Comment.findById(req.params.commentId);
    const isLike = comment.like.includes(req.session.user.id);

    // 좋아요 했으면 제거 안했으면 추가
    if (isLike) {
      await comment.updateOne({ $pull: { like: req.session.user.id } });
    } else {
      await comment.updateOne({ $push: { like: req.session.user.id } });
    }
    comment = await Comment.findById(req.params.commentId);
    res.status(200).json({ like: comment.like.length });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

// 댓글 저장
async function createComment(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    let comment = new Comment({
      post: req.params.postId,
      content: req.body.content.trim(),
      author: req.session.user.id,
    });

    await comment.save();
    await post.updateOne({ $push: { comments: comment.id } });
    comment = await Comment.findById(comment.id).populate("author", [
      "avatar",
      "name",
    ]);
    await User.findByIdAndUpdate(req.session.user.id, {
      $push: { comments: comment.id },
    });
    res.status(201).json({ comment });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

// 댓글 삭제
async function deleteComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.commentId).populate(
      "author",
      "id"
    );

    if (req.session.user.id !== comment.author.id)
      return res.status(401).json({ message: "권한이 없습니다." });
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment.id },
    });
    await User.findByIdAndUpdate(req.session.user.id, {
      $pull: { comments: comment.id },
    });
    await comment.deleteOne();
    // res.status(200).json({ comment });
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

// 댓글 수정
async function updateComment(req, res) {
  try {
    let comment = await Comment.findById(req.params.commentId).populate(
      "author",
      "id"
    );
    if (req.session.user.id !== comment.author.id)
      return res.status(401).json({ message: "권한이 없습니다." });
    comment.content = req.body.editContent;
    comment = await comment.save();
    res.status(200).json({ comment });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

module.exports = {
  handleLike,
  createComment,
  deleteComment,
  updateComment,
};
