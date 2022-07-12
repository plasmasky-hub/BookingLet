

# pull the official base image,choose a stable version, alias as build
FROM node:12.18.4-alpine


# set working direction
WORKDIR /usr/src/app

# # Adding node_modules/bin to the PATH environment variable  - make sure node exectable command can run smoothly
# ENV PATH /back_end/node_modules/.bin:$PATH


# copy application dependencies
# COPY ["package.json","package-lock.json*", "./"]
COPY package.json ./
COPY package-lock.json ./

# install application dependencies
RUN npm install 
RUN npm ci

# copy app source code
COPY . .

EXPOSE 8000
# Expose specific ports,e.g. 
# React-3000 ExpressJS-9000 Nginx-80 MongoDB-27017 MySQL-3306

# start app , see package.json inside for details
CMD ["npm","run","dev" ]



