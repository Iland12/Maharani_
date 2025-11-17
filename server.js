const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/save-feedback", (req, res) => {
  const feedback = req.body.feedback;

  const entry = {
    feedback: feedback,
    time: new Date().toLocaleString(),
  };

  let data = JSON.parse(fs.readFileSync("feedback.json"));
  data.push(entry);

  fs.writeFileSync("feedback.json", JSON.stringify(data, null, 2));

  res.send("Feedback saved");
});

app.post("/save-name", (req, res) => {
  const name = req.body.name;

  const entry = {
    name: name,
    time: new Date().toLocaleString(),
  };

  let data = JSON.parse(fs.readFileSync("feedback.json"));
  data.push(entry);

  fs.writeFileSync("feedback.json", JSON.stringify(data, null, 2));

  res.send("Name saved");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
