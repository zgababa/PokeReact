/* eslint-disable no-console */
'use strict';

const express = require('express');

const app = express();

app.use(require('./cors'));
app.use('/', require('./routes'));

app.listen(8080);
console.log('GraphQL server running on http://localhost:8080');
