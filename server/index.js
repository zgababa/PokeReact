/* eslint-disable no-console */
'use strict';

const express = require('express');
const path = require('path');

const cors = require('./cors');
const routes = require('./routes');

const app = express();

app.use(cors);
app.use('/', routes);
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist'));
});
app.use(express.static('app'));
app.use(express.static('img'));
app.use(express.static('dist'));

const listener = app.listen(process.env.PORT || 3000);
console.log('Server running on port', listener.address().port);
