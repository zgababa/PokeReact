"use strict";

const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/rootSchema');
const app = express();
const graphql = require("graphql").graphql;

app.use('/graphql',graphqlHTTP({schema: schema, pretty: true, graphiql: true}));

app.use('/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  return graphql(schema, req.query.graphqlQuery).then((response) => res.json(response.data));
});



app.listen(8080);

console.log('GraphQL server running on http://localhost:8080/graphql');
