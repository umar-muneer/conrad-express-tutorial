const express = require("express");
const bodyParser = require("body-parser");
const bunyanLogger = require("express-bunyan-logger");
const {courses, students} = require('./routers');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bunyanLogger());
app.get("/health", (req, res) => res.json("OK"));
app.get("/error", (req, res) => {
  throw new Error("oh no !!!");
});
app.use('/courses', courses);
app.use('/students', students);
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json("oh no, sth went wrong !!");
    req.log.error(err);
    return;
  }
});
app.listen(port, () => console.log(`listening on port ${port}`));
