const express = require("express");

const commentsRoutes = express.Router();

commentsRoutes.get("/", (req, res, next) => {
  console.log("To fetch all videos comment");
  next();
});

commentsRoutes.post("/", (req, res, next) => {
  console.log("to post a new video comment");
  next();
});

commentsRoutes.post("/:commentId", (req, res, next) => {
  console.log("to update  comment");
  next();
});

commentsRoutes.delete("/:commentId", (req, res, next) => {
  console.log("to delete  comment");
  next();
});

module.exports = commentsRoutes;
