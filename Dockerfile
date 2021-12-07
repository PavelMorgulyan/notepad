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
RUN pip install -r requirements.txt 
RUN chmod +x entrypoint.sh

# RUN npm install --production

COPY . .
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
# CMD ["python" , ".\\notes\\manage.py", "runserver"]
