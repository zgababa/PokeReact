"use strict";

const host = 'http://pokeapi.co/api/v2/';
const request = require('request-promise');
const path = require('path');
const Promise = require('bluebird');

function getPokemon(id) {
  return request({
    uri: host + path.join('pokemon-form', id.toString()),
    json : true
  });
}

function getPokemons() {
  return request({
    uri: host + path.join('pokemon-form'),
    json : true
  }).then((pokemons) => {
    const pokemonUrls = pokemons.results.map((pokemon) => request(pokemon.url));
    return Promise.all(pokemonUrls);
  }).then((pokemons) => pokemons.map((pokemon) => JSON.parse(pokemon)));
}

module.exports = {
  getPokemon,
  getPokemons
};
