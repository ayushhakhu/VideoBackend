const express = require("express");

const videoRoutes = express.Router();

const videoController = require("../controllers/videoController");

videoRoutes.get("/", (req, res, next) => {
  console.log("to fetch all videos");
  next();
});

videoRoutes.get("/:name", videoController.getFile);

videoRoutes.post("/", videoController.uploadFile);

videoRoutes.delete("/:videoId", (req, res, next) => {
  console.log("to delete a video");
  next();
});

module.exports = videoRoutes;
