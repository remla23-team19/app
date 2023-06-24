/* These lines of code are retrieving references to various HTML elements in the web page using their
respective `id` attributes. */
const queryForm = document.getElementById("query-form");
const queryInput = document.getElementById("predict");
const resultDiv = document.getElementById("result");
const correctButton = document.getElementById("correctButton");
const wrongButton = document.getElementById("wrongButton");
const savedParagraph = document.getElementById("saved");

/* These lines of code are hiding the "Correct" and "Wrong" buttons in the HTML form by setting their
CSS `display` property to "none". This is done initially when the page loads, so that the buttons
are not visible until the user inputs some text and the sentiment analysis result is displayed. The
buttons are then shown using the `showButtons()` function when the sentiment analysis result is
displayed, and hidden again using the `disableButtons()` function after the user has provided
feedback. */
correctButton.style.display = "none";
wrongButton.style.display = "none";

/* These are event listeners that are added to the "Correct", "Wrong", and "Submit" buttons in the HTML
form. */
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

/**
 * The function shows and enables two buttons regarding feedback of the result of the prompt sentiment.
 */
function showButtons() {
  correctButton.disabled = false;
  wrongButton.disabled = false;
  correctButton.style.display = "inline-block";
  wrongButton.style.display = "inline-block";
}

/**
 * The function disables and hides two buttons regarding feedback of the result of the prompt sentiment.
 */
function disableButtons() {
  correctButton.disabled = true;
  wrongButton.disabled = true;
  correctButton.style.display = "none";
  wrongButton.style.display = "none";
}

/**
 * This function saves a user's selection to a server and displays a "Saved!" message for 3 seconds.
 * @param selection - The parameter `selection` is a variable that contains the user's selection or
 * answer to a question. It is being passed as an argument to the `saveSelection` function. Should
 * be either "correct" or "wrong".
 */
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

/**
 * The function fades out an HTML element by gradually reducing its opacity.
 * @param element - The HTML element that we want to fade out.
 */
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

/**
 * The function returns a promise that resolves after a specified amount of time has passed.
 * @param ms - The parameter "ms" stands for milliseconds. It is the amount of time in milliseconds
 * that the function will wait before resolving the promise.
 * @returns The `sleep` function is returning a Promise object that resolves after a specified number
 * of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * The function retrieves the model URL from a server endpoint using asynchronous JavaScript.
 * @returns The `getModelUrl` function is returning a Promise that resolves to the `model_url` value
 * obtained from the JSON response of a fetch request to the "/model_url" endpoint.
 */
async function getModelUrl() {
  const response = await fetch("/model_url");
  const data = await response.json();
  return data.model_url;
}

/**
 * This function retrieves the model version from a server using an asynchronous fetch request.
 * @returns The `getModelVersion` function is returning the `model_version` property of the JSON data
 * received from the `/model_version` endpoint after making a fetch request.
 */
async function getModelVersion() {
  const response = await fetch("/model_version");
  const data = await response.json();
  return data.model_version;
}

/* This code block is retrieving the model URL from a server endpoint using an asynchronous fetch
request. It sets the `modelUrl` variable to the retrieved URL and updates the `href` and `innerHTML`
properties of the `modelUrlLink` HTML element to display the URL. If there is an error retrieving
the URL, it sets the `modelUrl` variable to a default URL and logs an error message to the console. */
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

/* This code block is retrieving the model version from a server using an asynchronous fetch request.
It sets the `modelVersion` variable to the retrieved version and updates the `innerHTML` property of
the `modelVersionElement` HTML element to display the version. If there is an error retrieving the
version, it sets the `modelVersion` variable to a default value of "latest" and logs an error
message to the console. */
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

/**
 * The function queries a machine learning model with input and displays the sentiment analysis result.
 * @param input - The input parameter is a string that represents the text to be analyzed for sentiment
 * analysis. It is used to query a machine learning model and obtain a sentiment score and label for
 * the input text.
 */
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

    // Check if the response is successful
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        // Response is valid JSON
        const data = await response.json();
        console.log(data);
        if (
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
      } else {
        // Response is not valid JSON, handle the error message
        const errorMessage = await response.text();
        resultDiv.innerHTML =
          "⚠️ </br> </br> <h6>JSON response contains error: " + error;
      }
    } else {
      // Response is not successful, handle the error
      throw new Error("HTTP status code: " + response.status);
    }
  } catch (error) {
    resultDiv.innerHTML = "⚠️ " + error;
  }
}
