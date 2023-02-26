const { Schema, SchemaTypes, default: mongoose } = require("mongoose");

const CommentSchema = new Schema(
  {
    comment: {
      type: SchemaTypes.String,
    },
    blogId: {
      type: SchemaTypes.ObjectId,
      ref: "Video",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
