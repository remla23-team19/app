const queryInput = document.getElementById("predict");
const resultDiv = document.getElementById("result");

queryInput.addEventListener("input", function(event) {
    let queryValue = queryInput.value.trim();
    if (queryValue) {
        query();
    }
});

async function query() {
    console.log("Querying");
    const response = await fetch("/predict", {
        method: "POST",
        body: new FormData(document.querySelector("form"))
    });
    const data = await response.json();
    console.log(data);
    let resultDiv = document.getElementById("result");
    if (data === null) {
        resultDiv.innerHTML = "⚠️";
    } else if (data['sentiment'] > 0) {
        resultDiv.innerHTML = "😊";
    } else if (data['sentiment'] <= 0) {
        resultDiv.innerHTML = "😞";
    } else {
        resultDiv.innerHTML = "⚠️";
    }
}
