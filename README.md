## Instructions

Run the model service separately from the web app. Please visit the [model-service GitHub](https://github.com/remla23-team19/model-service) for instructions on how to run it. If you want to change the host of the model-service used in this app, please change `ENV MODEL_URL="http://localhost:8080/sentiment"` in the Dockerfile or `.env` when running locally.

For the webservice, you can either run it locally or in a Docker container. Run it locally by installing the requirements via `pip install -r requirements.txt` and then running `python app.py`. Alternatively, you can run it in a Docker container by following the instructions below.

* Build the Docker image:
```zsh
docker build -t sentimentor .
```

* Run the Docker image:
```zsh
docker run --rm -it -p 9999:9999 sentimentor
```
