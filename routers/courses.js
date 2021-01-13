const express = require("express");
const { Course, Teacher } = require("../models/index");
const Router = express.Router();
const validateCoursePostRequest = (req, res, next) => {
  const { name, teacherId } = req.body;
  if (!name) {
    res.status(400).json({
      message: "the name of the course is required",
    });
    return;
  }
  if (!teacherId) {
    res.status(400).json({
      messsage: "the teacher id should be specified",
    });
  }
  next();
};
const checkCourseExists = async (req, res, next) => {
  const courseId = parseInt(req.params.course_id);
  const course = await Course.find({
    where: {
      id: courseId,
    },
  });
  if (!course) {
    res.status(404).json({
      message: "requested resource was not found",
    });
    return;
  }
  next();
};
Router.post("/", validateCoursePostRequest, async (req, res) => {
  const { name, teacherId } = req.body;
  const course = await Course.create({
    name,
    teacher_id: teacherId,
  });
  res.json(course);
});
Router.get("/", async (req, res) => {
  const randomHeader = req.get("x-random-header");
  res.set("x-random-header", randomHeader);
  const courses = await Course.findAll({
    include: {
      model: Teacher,
      as: "teacher",
    },
  });
  res.json(courses);
});
Router.put("/:course_id", checkCourseExists, async (req, res) => {
  const { name } = req.body;
  const courseId = parseInt(req.params.course_id);
  await Course.update(
    {
      name,
    },
    {
      where: {
        id: courseId,
      },
    }
  );
  res.status(204).end();
});
Router.delete("/:course_id", checkCourseExists, async (req, res) => {
  const courseId = parseInt(req.params.course_id);
  await Course.destroy({
    where: {
      id: courseId,
    },
  });
  res.status(204).end();
});
module.exports = Router;
