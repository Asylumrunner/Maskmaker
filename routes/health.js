const express = require('express');
const router = express.Router();
const winston = require('winston')

router.get('/', (req, res) => {
    winston.info("Health endpoint hit")
    res.send("Application is up and healthy!");
});

module.exports = router;