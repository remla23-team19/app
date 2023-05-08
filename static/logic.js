const queryForm = document.getElementById("query-form");
const queryInput = document.getElementById("predict");
const resultDiv = document.getElementById("result");

queryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let queryValue = queryInput.value.trim();
    if (queryValue) {
        query(queryValue);
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
    modelUrl = "http://localhost:8080/sentiment" // default
    modelUrlLink.href = modelUrl;
    modelUrlLink.innerHTML = modelUrl;
    console.error(`Error getting model URL: ${error}`);
});

async function query(input) {
    console.log("Querying the model with input: " + input);
    const body = JSON.stringify({
        "msg": input
    });
    console.log("Body: " + body);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", modelUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            if (data === null) {
                resultDiv.innerHTML = "⚠️ </br></br><h6>Error: null response</h6>";
            } else if ('sentiment' in data && 'label' in data['sentiment'] && data['sentiment']['label'] === 'POSITIVE') {
                resultDiv.innerHTML = "😊";
            } else if ('sentiment' in data && 'label' in data['sentiment'] && data['sentiment']['label'] === 'NEGATIVE') {
                resultDiv.innerHTML = "😞";
            } else {
                resultDiv.innerHTML = "⚠️ (Error)";
            }
        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
            resultDiv.innerHTML = "⚠️ </br> </br> <h6>Error: " + xhr.status + "</h6>";
        }
    };
    xhr.send(body);
}

async function getModelUrl() {
    const response = await fetch("/model_url");
    const data = await response.json();
    return data.model_url;
}
