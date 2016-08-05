"use strict";

const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/rootSchema');

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true, graphiql: true }))
  .listen(8080);

console.log('GraphQL server running on http://localhost:8080/graphql');
