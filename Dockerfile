FROM node:14-alpine

WORKDIR /home/locache

COPY . .

ENV PORT=8080

EXPOSE 8080

RUN npm install

CMD [ "npm", "run", "testAgent" ]