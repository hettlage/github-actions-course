FROM python:alpine3.19

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

COPY main.py .

CMD ["python", "/app/main.py"]
