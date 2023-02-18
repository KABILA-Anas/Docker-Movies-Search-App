FROM node:16

# Create app directory
WORKDIR /MovieApp

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8089
CMD [ "node", "server.js" ]