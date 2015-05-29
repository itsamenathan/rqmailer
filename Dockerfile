FROM node:0.10

COPY . /src
RUN cd /src && npm install

WORKDIR /src
ENTRYPOINT ["node", "index.js"]
