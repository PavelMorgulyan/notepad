ARG IMAGE=python:3

FROM $IMAGE
# 
# ENV PORT 8000
# EXPOSE $PORT

WORKDIR /usr/src/app

COPY requirements.txt .
COPY entrypoint.sh .
RUN pip install -r requirements.txt 
RUN chmod +x entrypoint.sh

COPY . .
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
# CMD ["python" , ".\\notes\\manage.py", "runserver"]
