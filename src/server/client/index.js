"use strict";

const host = 'http://pokeapi.co/api/v2/';
const request = require('request-promise');
const path = require('path');

function getPokemon(id) {
  return request({
    uri: host + path.join('pokemon-form', id),
    json : true
  });
}

module.exports = {
  getPokemon
};
