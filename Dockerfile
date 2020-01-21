FROM node:latest
WORKDIR /app 
ADD package*.json ./
ADD . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "start"]