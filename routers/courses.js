const express = require("express");
const Router = express.Router();
const collection = [];
const validateCoursePostRequest = (req, res, next) => {
  const { id, name } = req.body;
  if (isNaN(parseInt(id))) {
    res.status(400).json({
      message: "the id of the course should be a number",
    });
    return;
  }
  if (!name) {
    res.status(400).json({
      message: "the name of the course is required",
    });
    return;
  }
  next();
};
const checkCourseExists = (req, res, next) => {
  const courseId = parseInt(req.params.course_id);
  const courseIndex = collection.findIndex((course) => course.id === courseId);
  if (courseIndex === -1) {
    res.status(404).json({
      message: "requested resource was not found",
    });
    return;
  }
  req.courseIndex = courseIndex;
  next();
};
Router.post("/", validateCoursePostRequest, (req, res) => {
  const { id, name } = req.body;
  collection.push({ id, name });
  res.json({
    id,
    name,
  }); // sending a json request with the collection array as the body and status 200
});
Router.get("/", (req, res) => {
  const randomHeader = req.get("x-random-header");
  res.set("x-random-header", randomHeader);
  res.json(collection);
});
Router.put("/:course_id", checkCourseExists, (req, res) => {
  const { name } = req.body;
  const courseId = parseInt(req.params.course_id);
  const updatedCourse = {
    id: courseId,
    name,
  };
  collection[req.courseIndex] = updatedCourse;
  res.status(200).json(collection[req.courseIndex]);
});
Router.delete("/:course_id", checkCourseExists, (req, res) => {
  const courseId = parseInt(req.params.course_id);
  collection.splice(req.courseIndex, 1);
  res.status(204).end();
});
module.exports = Router;
