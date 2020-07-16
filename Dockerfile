FROM node:12 as staging
WORKDIR /usr/src/app
COPY . .
RUN npm install

FROM node:12 as building
WORKDIR /usr/src/app
COPY --from=staging ./dist .
COPY --from=staging package.json .
RUN npm install --only=prod

FROM node:12-alpine
COPY --from=building /usr/src/app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3333
CMD [ "node", "main.js" ]