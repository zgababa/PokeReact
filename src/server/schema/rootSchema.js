"use strict";

const graphql = require('graphql');
const pokemonType = require('./pokemon/pokemonType');
const client = require('../client');

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      pokemon: {
        type: pokemonType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, args) => client.getPokemon(args.id)
      }
    }
  })
});

module.exports = schema;
