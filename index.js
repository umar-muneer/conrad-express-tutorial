const express = require("express");
const bodyParser = require("body-parser");
const collection = [];
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get("/health", (req, res) => res.json("OK"));

app.post("/courses", (req, res) => {
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
app.put("/courses/:course_id", (req, res) => {
  const {name} = req.body;
  const courseId = parseInt(req.params.course_id);
  const updatedCourse = {
    id: courseId,
    name
  };
  const courseIndex = collection.findIndex(course => course.id === courseId);
  if (courseIndex === -1) {
    res.status(404).json({
      message: 'requested resource was not found'
    });
    return;
  }
  collection[courseIndex] = updatedCourse;
  res.status(200).json(collection[courseIndex]);
});
app.delete('/courses/:course_id', (req, res) => {
  const courseId = parseInt(req.params.course_id);
  const courseIndex = collection.findIndex(course => course.id === courseId);
  if (courseIndex === -1) {
    res.status(404).json({
      message: 'requested resource was not found'
    });
    return;
  }
  collection.splice(courseIndex, 1);
  res.status(204).end();
});
app.listen(port, () => console.log(`listening on port ${port}`));
