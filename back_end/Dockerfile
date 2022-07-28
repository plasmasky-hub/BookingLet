FROM node:16.14.2

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["npm", "start"]