/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const url = require('url');

process.env.REDISTOGO_URL = 'redis://redistogo:1576568405e84ef5a0ed5c2df79e22bb@porgy.redistogo.com:9937/';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  createClient() {
    let client;
    try {
      if (process.env.REDISTOGO_URL) {
        const redisUrl = url.parse(process.env.REDISTOGO_URL);
        client = redis.createClient(redisUrl.port, redisUrl.hostname);
        client.auth(redisUrl.auth.split(':')[1]);
        return client;
      }
      return redis.createClient();
    } catch (e) {
      console.log('ERROR :', e);
    }
  },
  save(client, key) {
    return (value) => client.setAsync(key, JSON.stringify(value)).then(() => value);
  },
  get(client, query) {
    return client.getAsync(query);
  }
};
