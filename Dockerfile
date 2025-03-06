FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8386

CMD [ "yarn", "dev" ]