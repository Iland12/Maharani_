const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // allow index.html

app.post("/save-feedback", (req, res) => {
    const { feedback, name } = req.body;

    let data = [];

    try {
        if (fs.existsSync("feedback.json")) {
            data = JSON.parse(fs.readFileSync("feedback.json"));
        }
    } catch (err) {
        console.log("Error reading feedback.json:", err);
    }

    const entry = {
        name,
        feedback,
        time: new Date().toLocaleString()
    };

    data.push(entry);

    fs.writeFileSync("feedback.json", JSON.stringify(data, null, 2));

    res.json({ message: "Feedback saved!" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
