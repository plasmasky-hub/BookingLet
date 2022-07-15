FROM node:14.17.6

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["npm", "run", "dev"]
