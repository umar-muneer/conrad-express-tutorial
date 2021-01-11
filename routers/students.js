const express = require('express');
const Router = express.Router()
Router.get("/", (req, res) => {
  res.json([]);
});
Router.post("/", (req, res) => {
  res.json({});
});
Router.put("/:student_id", (req, res) => {
  res.status(204).end();
});
Router.delete("/:student_id", (req, res) => {
  res.status(204).end();
});
module.exports = Router;