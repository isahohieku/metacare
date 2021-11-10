FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run migrate
EXPOSE 4000
CMD [ "node", "build/app.js" ]