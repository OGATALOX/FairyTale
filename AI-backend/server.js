// AI-backend/server.js
const express = require("express");
const cors = require("cors");

// For OpenAI v4+, require like this
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Correct way to instantiate OpenAI client in CommonJS
const openai = new OpenAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // MUST set this in Render environment variables
});

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "512x512",
    });

    // The URL of the generated image
    res.json({ image_url: result.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating image");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
