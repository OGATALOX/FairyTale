// AI-backend/server.js
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); // correct import for CommonJS

const app = express();
app.use(cors());
app.use(express.json());

// Instantiate OpenAI client properly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // MUST set in Render Environment Variables
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    res.json({ image_url: result.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating image" });
  }
});

app.get("/", (req, res) => {
  res.send("FairyTale AI Backend is running. Use POST /generate to generate images.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
