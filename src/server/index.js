"use strict";

const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/rootSchema');
const app = express();
const graphql = require("graphql").graphql;
//const redis = require("./redis/redis");
var redis = require('redis');
var redis = redis.createClient(); //creates a new redis

redis.on('error', function (err) {
  res.status(500).send('Error from cache');
});

function putInCache(req, res) {
  return (response) => {
    redis.set(req.query.graphqlQuery, JSON.stringify(response.data));
    return res.json(response.data);
  };
}

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.query.graphqlQuery) {
    return redis.get(req.query.graphqlQuery, (err, cache) => {
      if (!cache) {
        return graphql(schema, req.query.graphqlQuery).then(putInCache(req, res));
      }
      res.json(JSON.parse(cache));
    });
  }
  res.status(500).send('You must provide a query');
});

app.use('/graphql', graphqlHTTP({schema: schema, pretty: true, graphiql: true}));
app.use('/', (req, res, next) => {
  return graphql(schema, req.query.graphqlQuery)
    .then(putInCache(req, res))
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error with request');
    });
});




app.listen(8080);

console.log('GraphQL server running on http://localhost:8080');
