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
    console.log("Received request:", req.body); // log incoming request

    const prompt = req.body.prompt;
    console.log("Prompt:", prompt);

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "512x512",
    });

    console.log("OpenAI result:", result); // log the result

    res.json({ image_url: result.data[0].url });
  } catch (err) {
    console.error("🔥 BACKEND ERROR:", err.response?.data || err.message || err);
    res.status(500).send("Error generating image");
  }
});


app.get("/", (req, res) => {
  res.send("FairyTale AI Backend is running. Use POST /generate to generate images.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
