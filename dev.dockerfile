FROM node:16-alpine3.16

ENV TZ=Africa/Lagos
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 8082
CMD [ "npm", "run", "dev" ]
