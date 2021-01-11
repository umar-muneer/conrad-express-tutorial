const express = require("express");
const bodyParser = require("body-parser");
const collection = [];
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const checkCourseExists = (req, res, next) => {
  const courseId = parseInt(req.params.course_id);
  const courseIndex = collection.findIndex(course => course.id === courseId);
  if (courseIndex === -1) {
    res.status(404).json({
      message: 'requested resource was not found'
    });
    return;
  }
  req.courseIndex = courseIndex;
  next();
};
const validateCoursePostRequest = (req, res, next) => {
  const {id, name} = req.body;
  console.log(parseInt(id));
  if (isNaN(parseInt(id))) {
    res.status(400).json({
      message: 'the id of the course should be a number'
    });
    return;
  }
  if (!name) {
    res.status(400).json({
      message: 'the name of the course is required'
    });
    return;
  }
  next();
};
app.get("/health", (req, res) => res.json("OK"));

app.post("/courses", validateCoursePostRequest, (req, res) => {
  const { id, name } = req.body;
  collection.push({ id, name });
  res.json({
    id,
    name
  }); // sending a json request with the collection array as the body and status 200
});
app.get("/courses", (req, res) => {
  res.json(collection);
});
app.put("/courses/:course_id", checkCourseExists, (req, res) => {
  const {name} = req.body;
  const courseId = parseInt(req.params.course_id);
  const updatedCourse = {
    id: courseId,
    name
  };
  collection[req.courseIndex] = updatedCourse;
  res.status(200).json(collection[courseIndex]);
});
app.delete('/courses/:course_id', checkCourseExists, (req, res) => {
  const courseId = parseInt(req.params.course_id);
  collection.splice(req.courseIndex, 1);
  res.status(204).end();
});
app.listen(port, () => console.log(`listening on port ${port}`));
