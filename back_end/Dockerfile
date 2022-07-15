# syntax=docker/dockerfile:1

# pull the official base image,choose a stable version, alias as build
FROM node:14.14.0 AS build

# running in a development environment by default
# ENV NODE_ENV=development or production

# set working direction
WORKDIR /app

# Adding node_modules/bin to the PATH environment variable
ENV PATH /app/node_modules/.bin:$PATH

# copy application dependencies
COPY ["package.json","package-lock.json*", "./"]

# install application dependencies
RUN npm install 

# copy app source code
COPY . .

EXPOSE 8000
# Expose specific port

# start app , see package.json inside for details
CMD ["npm", "run","dev"]