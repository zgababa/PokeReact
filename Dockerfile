FROM node:6.3.1

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
ENV FROMDOCKER=true
COPY . /app
CMD ["npm", "run", "watch"]
