const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Application is up and healthy!");
});

module.exports = router;