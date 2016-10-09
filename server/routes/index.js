/* eslint-disable no-console, new-cap */
'use strict';

const express = require('express');
const graphql = require('graphql').graphql;
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/rootSchema');
const cache = require('../cache');

const router = express.Router();
const redisClient = cache.createClient();

router.use('/graphiql', graphqlHTTP({
  schema,
  pretty : true,
  graphiql : true
}));

router.get('/graphql', (req, res) => {
  const graphqlQuery = req.query.graphqlQuery;
  if (!graphqlQuery) {
    return res.status(500).send('You must provide a query');
  }
  return cache
    .get(redisClient, graphqlQuery)
    .then((value) => {
      if (!value) {
        return graphql(schema, graphqlQuery)
          .then(response => response.data)
          .then(cache.save(redisClient, graphqlQuery));
      }
      return JSON.parse(value);
    })
    .then((value) => res.json(value))
    .catch((err) => console.error(err));
});


module.exports = router;
