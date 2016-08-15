"use strict";

const redis = require('redis');

function connect() {
  const client = redis.createClient();
  client.on('connect', () => console.log('cache connected !'));
  return client;
}


module.exports = {
  connect
}
