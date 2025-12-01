const generateButton = document.getElementById("generate-button");
const promptInput = document.getElementById("prompt-text");
const outputDiv = document.getElementById("output");

generateButton.onclick = async () => {
  const prompt = promptInput.value;

  // Show a loading message or spinner
  outputDiv.textContent = "Generating image... ⏳";

  try {
    const response = await fetch("https://fairytale-4t2m.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.image) {
      // Display the image when ready
      outputDiv.innerHTML = `<img src="${data.image}" alt="AI Image" />`;
    } else {
      outputDiv.textContent = "Error generating image.";
    }
  } catch (err) {
    console.error(err);
    outputDiv.textContent = "Error generating image.";
  }
};
