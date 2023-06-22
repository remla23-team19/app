# App 📱
[![Latest Tag](https://img.shields.io/github/tag/remla23-team19/app.svg)](https://github.com/remla23-team19/app/tags) [![Latest Commit](https://img.shields.io/github/last-commit/remla23-team19/app.svg)](https://github.com/remla23-team19/app/commits/master) [![Python Version](https://img.shields.io/badge/python-3.9-yellow.svg)](https://www.python.org/downloads/release/python-390/)

Frontend web application that is able to bring together all the other components of the project. It is able to receive a text input from the user and return the sentiment analysis of the text using the [model-service](https://github.com/remla23-team19/model-service). Note, the model-service must be running in order for the app to work. Please visit [operation](https://github.com/remla23-team19/operation) to launch the complete project with all the components running together.



## Instructions ⚙️

Clone the repository:

```sh
git clone https://github.com/remla23-team19/app.git
```

You can either run the webservice locally or in a Docker container. 

---

Run it **locally** by installing the requirements as follows (virtual environment optional):
```zsh
python -m venv
source venv/bin/activate

pip install -r requirements.txt
pip install --index-url https://test.pypi.org/simple/ --no-deps lib_remla19
```
Then, run the app via `python app.py`.

---

Alternatively, you can run it in a **Docker** container by following the instructions below.

* Build the Docker image:
```zsh
docker build -t sentimentor .
```

* Run the Docker image:
```zsh
docker run --rm -it -p 9999:9999 sentimentor
```
