const queryForm = document.getElementById("query-form");
const queryInput = document.getElementById("predict");
const resultDiv = document.getElementById("result");

queryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let queryValue = queryInput.value.trim();
    if (queryValue) {
        query();
    }
});

async function getModelUrl() {
    const response = await fetch("/model_url");
    const data = await response.json();
    return data.model_url;
}

let modelUrl;
const modelUrlLink = document.getElementById("modelUrlLink");
getModelUrl().then((url) => {
    modelUrl = url;
    modelUrlLink.href = modelUrl;
    modelUrlLink.innerHTML = modelUrl;
    console.log(`Model URL: ${modelUrl}`);
}).catch((error) => {
    modelUrl = "http://localhost:8080/sentiment/" // default
    modelUrlLink.href = modelUrl;
    modelUrlLink.innerHTML = modelUrl;
    console.error(`Error getting model URL: ${error}`);
});

async function query() {
    console.log("Querying the model with input: " + queryInput.value);
    const response = await fetch("/predict", {
        method: "POST",
        body: new FormData(document.querySelector("form"))
    });
    const data = await response.json();
    console.log(data);
    let resultDiv = document.getElementById("result");
    if (data === null) {
        resultDiv.innerHTML = "⚠️ </br> </br> <h6>Error: null response</h6>";
    } else if ('sentiment' in data && data['sentiment'] > 0) {
        resultDiv.innerHTML = "😊";
    } else if ('sentiment' in data && data['sentiment'] <= 0) {
        resultDiv.innerHTML = "😞";
    } else if ('error' in data) {
        resultDiv.innerHTML = "⚠️ </br> </br> <h6>Error: " + data['error'] + "</h6>";
    } else {
        resultDiv.innerHTML = "⚠️ (Error)";
    }
}

async function getModelUrl() {
    const response = await fetch("/model_url");
    const data = await response.json();
    return data.model_url;
}
