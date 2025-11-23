// AI-backend/server.js
const express = require("express");
const cors = require("cors");

// Correct CommonJS import for OpenAI v4 SDK
const OpenAI = require("openai").default;

const app = express();
app.use(cors());
app.use(express.json());

// Init client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MAIN GENERATE ROUTE
app.post("/generate", async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const prompt = req.body.prompt;
    console.log("Prompt:", prompt);

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    console.log("Image generated!");

    res.json({ image_url: result.data[0].url });
  } catch (err) {
    console.error("🔥 ERROR:", err.response?.data || err);
    res.status(500).send("Error generating image");
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
