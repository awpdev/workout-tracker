const path = require("path");
const htmlRouter = require('express').Router();


htmlRouter.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

htmlRouter.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

htmlRouter.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = htmlRouter;