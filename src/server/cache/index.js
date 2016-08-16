/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
client.on('error', (err) => console.error('Error from cache', err));

module.exports = {
  save(key) {
    return (value) => client.setAsync(key, JSON.stringify(value)).then(() => value);
  },
  get(query) {
    return client.getAsync(query);
  }
};
