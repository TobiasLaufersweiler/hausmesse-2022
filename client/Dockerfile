FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip3 install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python3", "./client_local.py" ]