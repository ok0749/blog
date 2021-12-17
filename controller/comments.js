const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");

// 좋아요
async function like(req, res) {
  let comment = await Comment.findById(req.params.id);
  const isLike = comment.like.includes(req.session.user.id);

  //있으면 제거 없으면 추가
  try {
    if (isLike) {
      await comment.updateOne({ $pull: { like: req.session.user.id } });
    } else {
      await comment.updateOne({ $push: { like: req.session.user.id } });
    }

    comment = await Comment.findById(req.params.id);
    return res.status(200).json({ like: comment.like.length });
  } catch (err) {
    return res.status(400).json(err);
  }
}

// 댓글 저장
async function saveComment(req, res) {
  const post = await Post.findById(req.params.id);
  let comment = new Comment({
    post: req.params.id,
    content: req.body.content.trim(),
    author: req.session.user.id,
  });

  try {
    await comment.save();
    await post.updateOne({ $push: { comments: comment.id } });
    comment = await Comment.findById(comment.id).populate("author", [
      "avatar",
      "name",
    ]);
    await User.findByIdAndUpdate(req.session.user.id, {
      $push: { comments: comment.id },
    });
    return res.json({ comment });
  } catch (error) {
    console.error(error);
  }
}

// 댓글 삭제
async function deleteComment(req, res) {
  const comment = await Comment.findById(req.params.id).populate(
    "author",
    "id"
  );

  if (req.session.user.id === comment.author.id) {
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment.id },
    });
    await User.findByIdAndUpdate(req.session.user.id, {
      $pull: { comments: comment.id },
    });
    await comment.deleteOne();
    return res.json({ comment });
  }
  res.send("delete");
}

// 댓글 수정
async function saveEditComment(req, res) {
  let comment = await Comment.findById(req.params.id);
  comment.content = req.body.editContent;
  try {
    comment = await comment.save();
    res.json({ comment });
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
