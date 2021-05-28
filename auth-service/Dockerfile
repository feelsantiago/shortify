FROM node:12.18 As development

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

FROM node:12.18-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/src/main"]