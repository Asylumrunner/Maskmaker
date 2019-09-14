const express = require('express');
const router = express.Router();
const generate = require('../generation/generate');

router.get('/:num', (req, res) => {
    const num = req.params.num;
    generate.generate(num).catch((err) => {
        res.status(400);
    }).then((response) => {
        res.send(response);
    })
})

module.exports = router;