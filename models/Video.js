const { Schema, SchemaTypes, default: mongoose } = require("mongoose");

const VideoSchema = new Schema(
  {
    video_id: { type: SchemaTypes.String, required: true },
    uploadDate: { type: SchemaTypes.Date, required: true },
    uploadedBy: { type: SchemaTypes.ObjectId, required: true, ref: "User" },
  },
  {
    versionKey: false,
  }
);

const Video = new mongoose.model("Video", VideoSchema);

module.exports = Video;
