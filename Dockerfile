ARG IMAGE=python:3

FROM $IMAGE

# ENV PORT 8000
# EXPOSE $PORT

# LABEL python_version=python3.8
# RUN virtualenv --no-download /env -p python3.8

# Set virtualenv environment variables. This is equivalent to running
# source /env/bin/activate
# ENV VIRTUAL_ENV /env
# ENV PATH /env/bin:$PATH


WORKDIR /usr/src/app

COPY requirements.txt .
COPY entrypoint.sh .
ARG SECRET_KEY_DJANGO_NOTEPAD='django-insecure-ut%u9p4&@$&d8&fltb(w&=s_=hdbi^1sk46jar%&#o*+o2uzo@'
ENV SECRET_KEY_DJANGO_NOTEPAD=$SECRET_KEY_DJANGO_NOTEPAD
RUN pip install -r requirements.txt 
RUN chmod +x entrypoint.sh

# RUN npm install --production

COPY . .
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
# CMD ["python" , ".\\notes\\manage.py", "runserver"]
