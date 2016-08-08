"use strict";

import request from 'superagent';
const host = 'http://localhost:8080';
const queryParam = '?graphqlQuery=';

function getQuery(idPokemon) {
  return encodeURIComponent(`
    {
      pokemon(id: ${idPokemon}) {
        name
        orderFormatted
        img
      }
    }
  `);
}

function getPokemon(idPokemon) {
  const uri = host + queryParam + getQuery(idPokemon);
  return request.get(uri);
}

export default getPokemon;
