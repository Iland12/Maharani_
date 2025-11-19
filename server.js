const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("."));

// Safe file reading
function readData() {
  try {
    return JSON.parse(fs.readFileSync("feedback.json"));
  } catch (e) {
    return [];
  }
}

app.post("/save-feedback", (req, res) => {
  const feedback = req.body.feedback;

  const entry = {
    feedback,
    time: new Date().toLocaleString(),
  };

  let data = readData();
  data.push(entry);

  fs.writeFileSync("feedback.json", JSON.stringify(data, null, 2));

  res.send("Feedback saved");
});

app.post("/save-name", (req, res) => {
  const name = req.body.name;

  const entry = {
    name,
    time: new Date().toLocaleString(),
  };

  let data = readData();
  data.push(entry);

  fs.writeFileSync("feedback.json", JSON.stringify(data, null, 2));

  res.send("Name saved");
});

// Render-compatible port
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
