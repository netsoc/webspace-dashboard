# base image
FROM node:current-alpine3.13

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./

RUN npm install
RUN npm install @vue/cli@3.7.0 -g

COPY . .

EXPOSE 8080

# start app
CMD ["npm", "run", "serve"]
