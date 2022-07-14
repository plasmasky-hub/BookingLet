#Base Image node:12.18.4-alpine
FROM node:14.17.6

#Set working directory to /app
WORKDIR /app

#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

#Copy package.json & package-lock.json in the image
COPY package*.json ./

RUN npm install
#Run npm install dependencies

# NPM  build

#Copy the app
COPY . ./

EXPOSE 5000

#Start the app
CMD ["npm", "run", "dev"]