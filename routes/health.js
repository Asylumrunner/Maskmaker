const express = require('express');
const router = express.Router();
const winston = require('winston');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

router.get('/', (req, res) => {
    winston.info("Health endpoint hit")
    res.send("Application is up and healthy!");
});

module.exports = router;