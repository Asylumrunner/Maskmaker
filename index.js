const winston = require('winston');
const express = require('express');
const app = express();

require('./setup/logging')();
require('./setup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info('App live and listening on port ${port}'));