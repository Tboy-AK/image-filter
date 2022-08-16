FROM node:12-alpine3.15
WORKDIR /usr/app
COPY package*.json .
RUN npm i
RUN npm i -D dotenv
COPY . .
EXPOSE 8082
CMD [ "npm", "run", "dev" ]