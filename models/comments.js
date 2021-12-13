const mongoose = require("mongoose");
// const { marked } = require("marked");
// const createDomPurifier = require("dompurify");
// const { JSDOM } = require("jsdom");

// const dompurify = createDomPurifier(new JSDOM().window);

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goodCnt: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
