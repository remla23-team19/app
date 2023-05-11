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

async function getModelVersion() {
    const response = await fetch("/model_version");
    const data = await response.json();
    return data.model_version;
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

let modelVersion;
const modelVersionElement = document.getElementById("modelVersion");
getModelVersion().then((version) => {
    modelVersion = version;
    modelVersionElement.innerHTML = modelVersion;
    console.log(`Model Version: ${modelVersion}`);
}).catch((error) => {
    modelVersion = "latest" // default
    modelVersionElement.innerHTML = modelVersion;
    console.error(`Error getting model version: ${error}`);
});

async function query(input) {
    console.log("Querying the model with input: " + input);
    const body = JSON.stringify({
        "msg": input
    });
    console.log("Body: " + body);
    try {
        const response = await fetch(modelUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });
        const data = await response.json();
        console.log(data);
        if (data === null) {
            resultDiv.innerHTML = "⚠️ </br></br><h6>Error: null response</h6>";
        } else if ('sentiment' in data && 'label' in data['sentiment'] && data['sentiment']['label'] === 'POSITIVE') {
            resultDiv.innerHTML = "😊 <h6>(Score: " + data['sentiment']['score'] + ")</h6>";
        } else if ('sentiment' in data && 'label' in data['sentiment'] && data['sentiment']['label'] === 'NEGATIVE') {
            resultDiv.innerHTML = "😞 <h6>(Score: " + data['sentiment']['score'] + ")</h6>";
        } else {
            resultDiv.innerHTML = "⚠️ (Error)";
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ </br> </br> <h6>Error: " + error + "</h6>";
    }
}

async function getModelUrl() {
    const response = await fetch("/model_url");
    const data = await response.json();
    return data.model_url;
}
