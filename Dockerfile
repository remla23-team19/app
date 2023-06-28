# Dockerfile
FROM python:3.8-slim
ENV MODEL_URL="http://localhost:8080/sentiment"
ENV VERSION="latest"
WORKDIR /root
COPY requirements.txt /root/
RUN python -m pip install --upgrade pip &&\
    pip install -r requirements.txt &&\
    pip install --index-url https://test.pypi.org/simple/ --no-deps lib_remla19
COPY app.py /root/
COPY /templates/ /root/templates/
COPY /static/ /root/static/
ENTRYPOINT ["python"]
CMD ["app.py"]
EXPOSE 9999
