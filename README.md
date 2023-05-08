## Instructions

You can either run the webservice locally or in a Docker container. 

---

Run it **locally** by installing the requirements as follows:
```zsh
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
