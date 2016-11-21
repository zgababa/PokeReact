/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('./cors');
const routes = require('./routes');

const app = express();

app.use(cors);
app.use('/', routes);
app.use(express.static('app'));
app.use(express.static('img'));
app.use(express.static('dist'));

const listener = app.listen(process.env.PORT || 3000);
console.log('Server running on port', listener.address().port);
