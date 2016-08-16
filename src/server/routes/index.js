/* eslint-disable no-console, new-cap */
'use strict';

const express = require('express');

const router = express.Router();
const graphql = require('graphql').graphql;
const cache = require('../cache');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/rootSchema');

router.use('/graphql', graphqlHTTP({
  schema,
  pretty : true,
  graphiql : true
}));

router.get('/', (req, res) => {
  const graphqlQuery = req.query.graphqlQuery;
  if (!graphqlQuery) {
    return res.status(500).send('You must provide a query');
  }
  return cache
    .get(graphqlQuery)
    .then((value) => {
      if (!value) {
        return graphql(schema, graphqlQuery)
          .then(response => response.data)
          .then(cache.save(graphqlQuery));
      }
      return JSON.parse(value);
    })
    .then((value) => res.json(value))
    .catch((err) => console.error(err));
});


module.exports = router;
