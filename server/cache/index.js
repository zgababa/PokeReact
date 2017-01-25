/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const config = require('config');
const get = require('lodash.get');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  createClient() {
    const client = config.app.docker
      ? redis.createClient({ host : 'redis' })
      : redis.createClient(get(config, 'cache.url'));
    client.on('error', (err) => console.error(err.toString()));
    return client;
  },
  save(client, key) {
    return (value) => client.setAsync(key, JSON.stringify(value)).then(() => value);
  },
  get(client, query) {
    return client.getAsync(query);
  }
};
