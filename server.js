const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // serve index.html

app.post("/submit", (req, res) => {
  const feedbackData = JSON.stringify(req.body) + "\n";
  fs.appendFileSync("feedback.json", feedbackData);
  res.json({ message: "Feedback saved!" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
