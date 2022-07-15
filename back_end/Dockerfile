

FROM node:16.0.0


WORKDIR /usr/src/app



COPY package.json ./
COPY package-lock.json ./


RUN npm install -g npm@8.14.0

COPY ./ ./

EXPOSE 8000

CMD ["npm","run","dev" ]



