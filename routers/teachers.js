const express = require('express');
const {Teacher} = require('../models');
const Router = express.Router();
Router.get("/", async (req, res) => {
  const teachers = await Teacher.findAll();
  res.json(teachers); 
});
Router.get("/:teacher_id", async (req, res) => {
  const teacherId = parseInt(req.params.teacher_id);
  const teacher = await Teacher.findById(teacherId);
  res.json(teacher); 
});
Router.post("/", async (req, res) => {
  const {name} = req.body;
  const teacher = await Teacher.create({
    name
  });
  res.json(teacher);
});
Router.put("/:teacher_id", async (req, res) => {
  const {name} = req.body;
  const teacherId = parseInt(req.params.teacher_id, 10);
  await Teacher.update({
    name
  }, {
    where: {
      id: teacherId
    }
  });
  res.status(204).end();
});
Router.get("/:teacher_id/courses", async (req, res) => {
  const teacherId = parseInt(req.params.teacher_id);
  const teacher = await Teacher.findById(teacherId);
  const teacherCourses = await teacher.getCourses();
  res.json(teacherCourses);
});
Router.delete("/:teacher_id", async (req, res) => {
  const teacherId = parseInt(req.params.teacher_id, 10);
  await Teacher.destroy({
    where: {
      id: teacherId
    }
  });
  res.status(204).end();
});
module.exports = Router;