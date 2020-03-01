FROM node:13.8.0-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js