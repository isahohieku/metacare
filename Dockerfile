FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 4000
CMD [ "node", "build/app.js" ]