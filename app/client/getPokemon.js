'use strict';

import request from 'superagent';

const path = '/graphql';
const queryParam = '?graphqlQuery=';
function getQuery(idPokemon) {
  return `
    {
      pokemon(id: ${idPokemon}) {
        name
        orderFormatted
        img
      }
    }
  `;
}
/*
  No 'export default' here, because we stub getPokemon in Pokedex.spec.js and
  we won't default property in object.
*/
export function getPokemon(idPokemon) {
  const uri = path + queryParam + getQuery(idPokemon);
  return request.get(uri);
}
