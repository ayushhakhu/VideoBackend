const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

global.__basedir = __dirname;

const app = express();

const videoRoutes = require("./routes/videosRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const authRoutes = require("./routes/userRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.static("data"));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/video", videoRoutes);

app.use("/comments", commentsRoutes);

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log("err~~~~~~~~~~~~~>", err);
  res.status(500).json({ message: "Error occoured" });
});

mongoose
  .connect(
    "mongodb+srv://test:yJMyEQ9XOS7Xck6l@cluster0.1aacova.mongodb.net/video"
  )
  .then((_) => {
    app.listen("8000", () => {
      console.log("Listening on Port 8000");
    });
  })
  .catch((err) => console.log("Unable to connect to DB"));
