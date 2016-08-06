"use strict";

const graphql = require('graphql');

const pokemonType = new graphql.GraphQLObjectType({
  name: 'PokemonType',
  fields: {
    id : { type : graphql.GraphQLString },
    name : { type : graphql.GraphQLString },
    order : { type : graphql.GraphQLInt },
    img : {
      type : graphql.GraphQLString,
      resolve : (pokemon) => pokemon.sprites.front_default
    }
  }
});

module.exports = pokemonType;
