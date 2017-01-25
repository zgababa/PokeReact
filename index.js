/* eslint-disable no-console */
'use strict';

const express = require('express');
const path = require('path');
const config = require('config');

const cors = require('./server/cors');
const routes = require('./server/routes');

const app = express();

app.use(cors);
app.use(express.static('img'));
app.use(express.static('dist'));
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.use(routes);
app.listen(config.app.port, () => {
  const port = config.app.docker ? '3OO1' : config.app.port;
  console.log('Application running on port', port);
});
