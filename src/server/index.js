/* eslint-disable no-console */
'use strict';

const express = require('express');

const app = express();

app.use(require('./cors'));
app.use('/', require('./routes'));

app.listen(process.env.PORT || 3000);
console.log('GraphQL server running on http://localhost:8080');
