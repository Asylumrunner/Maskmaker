const winston = require('winston');
const express = require('express');
const app = express();

require('./setup/logging')();
winston.info("Logging set up");
require('./setup/routes')(app);
winston.info("Routes set up");

const port = process.env.PORT || 3000;
if(process.env.ENVIRONMENT == "local"){
    app.listen(port, () => winston.info('App live and listening on port %d', port));
}
else{
    module.exports = app;
}