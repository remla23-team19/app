const queryForm = document.getElementById("query-form");
const queryInput = document.getElementById("predict");
const resultDiv = document.getElementById("result");
const correctButton = document.getElementById("correctButton");
const wrongButton = document.getElementById("wrongButton");
const savedParagraph = document.getElementById("saved");

correctButton.style.display = "none";
wrongButton.style.display = "none";

correctButton.addEventListener("click", async function () {
  disableButtons();
  saveSelection("correct");
});

wrongButton.addEventListener("click", async function () {
  disableButtons();
  saveSelection("wrong");
});

queryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let queryValue = queryInput.value.trim();
  if (queryValue) {
    query(queryValue);
  }
});

function showButtons() {
  correctButton.disabled = false;
  wrongButton.disabled = false;
  correctButton.style.display = "inline-block";
  wrongButton.style.display = "inline-block";
}

function disableButtons() {
  correctButton.disabled = true;
  wrongButton.disabled = true;
  correctButton.style.display = "none";
  wrongButton.style.display = "none";
}

async function saveSelection(selection) {
  try {
    const response = await fetch("http://localhost/correctness", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctness: selection,
      }),
    });
  } catch (error) {
    console.log(error);
  }
  savedParagraph.innerText = "Saved!";
  savedParagraph.style.opacity = 1;
  await sleep(3000);
  fadeOut(savedParagraph);
}

function fadeOut(element) {
  let opacity = 1;
  const timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer);
      element.innerText = "";
      element.style.opacity = 0;
    }
    element.style.opacity = opacity;
    opacity -= opacity * 0.1;
  }, 30);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getModelUrl() {
  const response = await fetch("/model_url");
  const data = await response.json();
  return data.model_url;
}

async function getModelVersion() {
  const response = await fetch("/model_version");
  const data = await response.json();
  return data.model_version;
}

let modelUrl;
const modelUrlLink = document.getElementById("modelUrlLink");
getModelUrl()
  .then((url) => {
    modelUrl = url;
    modelUrlLink.href = modelUrl;
    modelUrlLink.innerHTML = modelUrl;
    console.log(`Model URL: ${modelUrl}`);
  })
  .catch((error) => {
    modelUrl = "http://localhost:8080/sentiment"; // default
    modelUrlLink.href = modelUrl;
    modelUrlLink.innerHTML = modelUrl;
    console.error(`Error getting model URL: ${error}`);
  });

let modelVersion;
const modelVersionElement = document.getElementById("modelVersion");
getModelVersion()
  .then((version) => {
    modelVersion = version;
    modelVersionElement.innerHTML = modelVersion;
    console.log(`Model Version: ${modelVersion}`);
  })
  .catch((error) => {
    modelVersion = "latest"; // default
    modelVersionElement.innerHTML = modelVersion;
    console.error(`Error getting model version: ${error}`);
  });

async function query(input) {
  console.log("Querying the model with input: " + input);
  const body = JSON.stringify({
    msg: input,
  });
  console.log("Body: " + body);
  try {
    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    console.log(data);
    if (data === null) {
      resultDiv.innerHTML = "⚠️ </br></br><h6>Error: null response</h6>";
    } else if (
      "sentiment" in data &&
      "label" in data["sentiment"] &&
      data["sentiment"]["label"] === "POSITIVE"
    ) {
      resultDiv.innerHTML =
        "😊 <h6>(Score: " + data["sentiment"]["score"] + ")</h6>";
    } else if (
      "sentiment" in data &&
      "label" in data["sentiment"] &&
      data["sentiment"]["label"] === "NEGATIVE"
    ) {
      resultDiv.innerHTML =
        "😞 <h6>(Score: " + data["sentiment"]["score"] + ")</h6>";
    } else {
      resultDiv.innerHTML = "⚠️ (Error)";
    }

    // Show feedback buttons
    showButtons();
  } catch (error) {
    resultDiv.innerHTML = "⚠️ </br> </br> <h6>Error: " + error + "</h6>";
  }
}

async function getModelUrl() {
  const response = await fetch("/model_url");
  const data = await response.json();
  return data.model_url;
}
