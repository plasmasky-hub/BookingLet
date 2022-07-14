

FROM node:18.0.0


WORKDIR /app



COPY package.json ./
COPY package-lock.json ./

RUN npm install 


COPY ./ ./

EXPOSE 8000

CMD ["npm","run","dev" ]



