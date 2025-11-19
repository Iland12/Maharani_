import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const FeedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// SAVE FEEDBACK (POST)
app.post("/api/feedback", async (req, res) => {
  try {
    const fb = new Feedback({
      name: req.body.name,
      message: req.body.message,
    });

    await fb.save();
    res.json({ success: true, msg: "Saved!" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ⭐ SHOW ALL FEEDBACK (GET)
app.get("/api/feedback/all", async (req, res) => {
  try {
    const data = await Feedback.find().sort({ date: -1 });

    const formatted = data.map((fb) => ({
      name: fb.name,
      message: fb.message,
      date: fb.date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
