/* eslint-disable no-console*/
'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const URI = require('urijs');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  createClient() {
    let client;
    if (process.env.REDISTOGO_URL) {
      const redisURL = new URI(process.env.REDISTOGO_URL);
      client = redis.createClient(redisURL.port(), redisURL.hostname());
      client.auth(redisURL.authority().split(':')[1]);
      return client;
    }
    client = redis.createClient();
    client.on('error', (err) => {
      console.log("errr", err);
    });
    return client;
  },
  save(client, key) {
    return (value) => client.setAsync(key, JSON.stringify(value)).then(() => value);
  },
  get(client, query) {
    return client.getAsync(query);
  }
};
