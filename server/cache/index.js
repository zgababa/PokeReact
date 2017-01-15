/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const url = require('url');
const config = require('config');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  createClient() {
    let client;
    try {
      if (config.cache.url) {
        const redisUrl = url.parse(config.cache.url);
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
