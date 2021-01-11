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
  res.json(collection); // sending a json request with the collection array as the body and status 200
});
app.listen(port, () => console.log(`listening on port ${port}`));
