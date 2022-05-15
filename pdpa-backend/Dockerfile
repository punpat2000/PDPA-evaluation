FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN pip install 'pymongo[srv]'

RUN pip install --user --upgrade git+https://github.com/twintproject/twint.git@origin/master#egg=twint

COPY ./src /code/src

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
