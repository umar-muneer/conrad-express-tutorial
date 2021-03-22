const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const bunyanLogger = require("express-bunyan-logger");
const {initDb} = require('./models/index');
const {courses, students, teachers} = require('./routers');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bunyanLogger());
app.get("/health", (req, res) => res.json("OK"));
app.get("/error", (req, res) => {
  throw new Error("oh no !!!");
});
app.use('/courses', courses);
app.use('/students', students);
app.use('/teachers', teachers);
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json("oh no, sth went wrong !!");
    req.log.error(err);
    return;
  }
});
(async () => {
  await initDb();
  app.listen(port, () => console.log(`listening on port ${port}`));
})();
