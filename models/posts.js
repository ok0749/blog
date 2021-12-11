const mongoose = require("mongoose");
const { marked } = require("marked");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");

const dompurify = createDomPurifier(new JSDOM().window);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

postSchema.pre("validate", function (next) {
  if (this.markdown)
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
  next();
});

module.exports = mongoose.model("Post", postSchema);
