FROM python:3
FROM tensorflow/tensorflow:latest-py3

RUN apt-get -y update && apt-get install -y --no-install-recommends apt-utils nginx curl wget unzip python3-pip

RUN pip3 install --upgrade pip

#RUN python3 --version
#RUN pip3 --version

RUN mkdir -p /tensorflow/models

RUN apt-get install -y git

#RUN pip install tensorflow

RUN apt-get install -y protobuf-compiler python-pil python-lxml python-tk
RUN pip3 install Cython
RUN pip3 install contextlib2
RUN pip3 install jupyter
RUN pip3 install matplotlib

RUN git clone https://github.com/tensorflow/models.git /tensorflow/models

WORKDIR /tensorflow/models/research

#RUN protoc object_detection/protos/*.proto --python_out=.
RUN wget -O protobuf.zip https://github.com/google/protobuf/releases/download/v3.0.0/protoc-3.0.0-linux-x86_64.zip
RUN unzip protobuf.zip

RUN ./bin/protoc object_detection/protos/*.proto --python_out=.

RUN export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim

CMD ["python3", "object_detection/builders/model_builder_test.py"] 
