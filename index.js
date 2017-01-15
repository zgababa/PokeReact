/* eslint-disable no-console */
'use strict';

const express = require('express');
const path = require('path');

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

const listener = app.listen(process.env.PORT || 3000);
console.log('Server running on port', listener.address().port);
