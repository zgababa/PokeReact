/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const url = require('url');
const config = require('config');
const get = require('lodash.get');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  createClient() {
    try {
      if (get(config, 'cache.url')) {
        const redisUrl = url.parse(config.cache.url);
        const client = redis.createClient(redisUrl.port, redisUrl.hostname);
        if (redisUrl.auth) {
          client.auth(redisUrl.auth.split(':')[1]);
        }
        return client;
      }
      return redis.createClient({ host : 'redis' });
    } catch (e) {
      console.log('Error in connection with redis :', e);
    }
  },
  save(client, key) {
    return (value) => client.setAsync(key, JSON.stringify(value)).then(() => value);
  },
  get(client, query) {
    return client.getAsync(query);
  }
};
