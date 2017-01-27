'use strict';

const express = require('express');
const graphql = require('graphql').graphql;
const request = require('request-promise');

const rootSchema = require('../server/schema/rootSchema');

function start(done, appPort) {
  const app = express();
  const PORT = appPort || 9000;

  app.get('/graphql', (req, res) => {
    const query = req.query.graphqlQuery;
    if (!query) {
      return res.status(500).send('You must provide a query');
    }

    return graphql(rootSchema, query)
      .then(response => response.data)
      .then((data) => res.json(data))
      .catch((err) => console.error(err));
  });

  return app.listen(PORT, () => {
    console.log('Server started at port [%s]', PORT);
    done();
  });
}

function stop(app, done) {
  app.close();
  done();
}

function graphqlQuery(app, query) {
  return request({
    baseUrl : `http://localhost:${app.address().port}`,
    uri : '/graphql',
    qs : {
      graphqlQuery : query
    },
    resolveWithFullResponse : true,
    json : true
  });
}

module.exports = {
  start,
  stop,
  graphqlQuery
};
