import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Paste YOUR Gemini API Key here
const genAI = new GoogleGenerativeAI("AIzaSyAv2if2jNnokaZOUWL3KVi0GzIh4clhijM");

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(prompt);
    res.json({ output: result.response.text() });

  } catch (error) {
    // ✅ Offline fallback
    res.json({
      output: `
📘 Study Plan for Java (Easy)

Day 1: Java basics & syntax
Day 2: Control statements & loops
Day 3: OOP concepts
Day 4: Arrays & Strings
Day 5: Practice programs & revision

Tips:
• Study daily
• Practice coding
• Revise before exams
`
    });
  }
});

app.listen(3000, () =>
  console.log("✅ Server running at http://localhost:3000")
);
