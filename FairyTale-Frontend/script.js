// 1️⃣ Get references to HTML elements
const input = document.getElementById("prompt-text");
const button = document.getElementById("generate-button");
const output = document.getElementById("output");

// 2️⃣ Add click event listener
button.addEventListener("click", async () => {
  const prompt = input.value.trim(); // get text

  // 3️⃣ Clear previous output
  output.innerHTML = "";

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // 4️⃣ Optional: show a "loading" message
  const loadingText = document.createElement("p");
  loadingText.textContent = "Generating image...";
  output.appendChild(loadingText);

  try {
    // 5️⃣ Call your Render backend
    const response = await fetch("https://your-backend.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();

    // 6️⃣ Remove loading message
    output.innerHTML = "";

    if (data.error) {
      output.textContent = "Error: " + data.error;
      return;
    }

    // 7️⃣ Create image element with the URL returned by backend
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = prompt;
    img.style.marginTop = "20px";
    img.style.maxWidth = "100%";

    output.appendChild(img);

  } catch (err) {
    output.innerHTML = "";
    output.textContent = "Error connecting to backend.";
    console.error(err);
  }
});
