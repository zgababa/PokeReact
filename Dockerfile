FROM node:6.3.1

# Start the app
#CMD npm start

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run", "watch"]
