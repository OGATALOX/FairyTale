// Get references to DOM elements
const input = document.getElementById("prompt-text");
const button = document.getElementById("generate-button");
const output = document.getElementById("output");

// Replace with your Render backend URL
const API_URL = "https://fairytale-4t2m.onrender.com";

button.addEventListener("click", async () => {
    const promptText = input.value.trim();
    if (!promptText) return;

    output.innerHTML = "Generating image...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptText })
        });

        const data = await response.json();

        if (data.image_url) {
            // Show the image
            output.innerHTML = `<img src="${data.image_url}" alt="AI Image" style="max-width:100%; margin-top:20px;">`;
        } else {
            output.innerHTML = "Failed to generate image.";
        }
    } catch (err) {
        console.error(err);
        output.innerHTML = "Error generating image.";
    }
});
