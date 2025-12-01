import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

// Stable Diffusion XL model (free, good quality)
const MODEL_URL = "https://router.huggingface.co/hf-inference/stabilityai/stable-diffusion-xl-base-1.0";

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Prompt:", prompt);

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("HF Error:", text);
      return res.status(500).send("Image generation failed.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    res.json({ image: `data:image/png;base64,${base64Image}` });

  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.status(500).send("Server error");
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
