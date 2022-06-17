FROM python:alpine

COPY . /app

WORKDIR /app/src

RUN pip install --no-cache -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]
