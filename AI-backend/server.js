const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Make sure you set this on Render
});

const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "512x512"
        });
        res.json({ image_url: response.data.data[0].url });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating image");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
