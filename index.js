const express = require("express");
const bodyParser = require("body-parser");
const bunyanLogger = require("express-bunyan-logger");
const collection = [];
const app = express();
const port = process.env.PORT || 3000;

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
app.use(bodyParser.json());
app.use(bunyanLogger());
app.get("/health", (req, res) => res.json("OK"));
app.post("/courses", validateCoursePostRequest, (req, res) => {
  const { id, name } = req.body;
  collection.push({ id, name });
  res.json({
    id,
    name,
  }); // sending a json request with the collection array as the body and status 200
});
app.get("/courses", (req, res) => {
  const randomHeader = req.get('x-random-header');
  res.set('x-random-header', randomHeader);
  res.json(collection);
});
app.put("/courses/:course_id", checkCourseExists, (req, res) => {
  const { name } = req.body;
  const courseId = parseInt(req.params.course_id);
  const updatedCourse = {
    id: courseId,
    name,
  };
  collection[req.courseIndex] = updatedCourse;
  res.status(200).json(collection[req.courseIndex]);
});
app.delete("/courses/:course_id", checkCourseExists, (req, res) => {
  const courseId = parseInt(req.params.course_id);
  collection.splice(req.courseIndex, 1);
  res.status(204).end();
});
app.get("/error", (req, res) => {
  throw new Error("oh no !!!");
});
app.get('/students', (req, res) => {
  res.json([]);
});
app.post('/students', (req, res) => {
  res.json({});
});
app.put('/students/:student_id', (req, res) => {
  res.status(204).end();
});
app.delete('/students/:student_id', (req, res) => {
  res.status(204).end();
});
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json("oh no, sth went wrong !!");
    req.log.error(err);
    return;
  }
});
app.listen(port, () => console.log(`listening on port ${port}`));
