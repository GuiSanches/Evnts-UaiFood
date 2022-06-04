# from base image node
FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json /usr/src/app

# install all dependencies
RUN npm install
RUN npm install -g ts-node

# copy oter files as well
COPY . /usr/src/app

#expose the port
EXPOSE 7500

# command to run when intantiate an image
CMD ["npm","run", "start"]