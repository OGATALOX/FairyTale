const generateButton = document.getElementById("generate-button");
const promptInput = document.getElementById("prompt-text");
const outputDiv = document.getElementById("output");

generateButton.onclick = async () => {
  const prompt = promptInput.value;

  try {
    const response = await fetch("https://fairytale-4t2m.onrender.com/generate", {  // ← MUST match your Render URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.image_url) {
      outputDiv.innerHTML = `<img src="${data.image_url}" alt="AI Image" />`;
    } else {
      outputDiv.textContent = "Error generating image.";
    }
  } catch (err) {
    console.error(err);
    outputDiv.textContent = "Error generating image.";
  }
};
