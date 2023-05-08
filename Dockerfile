# Dockerfile
FROM python:3.7-slim
ENV MODEL_URL="http://localhost:8080/sentiment"
WORKDIR /root
COPY requirements.txt /root/
RUN python -m pip install --upgrade pip &&\
    pip install -r requirements.txt
COPY app.py /root/
COPY .env /root/
COPY /templates/ /root/templates/
COPY /static/ /root/static/
ENTRYPOINT ["python"]
CMD ["app.py"]
EXPOSE 9999
