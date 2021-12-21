FROM node:16.13.1

WORKDIR /usr/src/Face-Detector-API

COPY ./ ./

RUN npm install

CMD ["bin/bash"]