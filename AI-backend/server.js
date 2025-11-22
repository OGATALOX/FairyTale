// 1️⃣ Import required packages
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

// 2️⃣ Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// 3️⃣ Enable CORS so frontend can talk to backend
app.use(cors());

// 4️⃣ Parse JSON bodies
app.use(express.json());

// 5️⃣ Configure OpenAI with your API key (stored as environment variable)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 6️⃣ Define POST route for generating images
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt; // frontend sends { prompt: "text" }

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 7️⃣ Call OpenAI Image API
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,               // number of images
      size: "512x512",    // image size
    });

    // 8️⃣ Get the image URL
    const imageUrl = response.data.data[0].url;

    // 9️⃣ Send the image URL back to frontend
    res.json({ url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 10️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
