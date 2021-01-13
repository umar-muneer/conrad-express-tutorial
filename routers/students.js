const express = require("express");
const { Student, CourseStudent, Course } = require("../models");
const Router = express.Router();
Router.get("/", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});
Router.post("/", async (req, res) => {
  const { name } = req.body;
  const student = await Student.create({
    name,
  });
  res.json(student);
});
Router.put("/:student_id", async (req, res) => {
  const { name } = req.body;
  const studentId = parseInt(req.params.student_id, 10);
  await Student.update(
    {
      name,
    },
    {
      where: {
        id: studentId,
      },
    }
  );
  res.status(204).end();
});
Router.post("/:student_id/courses/", async (req, res) => {
  const { course } = req.body;
  const studentId = req.params.student_id;
  await CourseStudent.create({
    course_id: course.id,
    student_id: studentId,
  });
  const courseStudent = await CourseStudent.find({
    where: {
      course_id: course.id,
      student_id: studentId,
    },
    include: [
      {
        model: Student,
        as: "student",
      },
      {
        model: Course,
        as: "course",
      },
    ],
  });
  res.json(courseStudent);
});
Router.delete("/:student_id", async (req, res) => {
  const studentId = parseInt(req.params.student_id, 10);
  await Student.destroy({
    where: {
      id: studentId,
    },
  });
  res.status(204).end();
});
module.exports = Router;
