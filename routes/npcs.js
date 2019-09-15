const express = require('express');
const winston = require('winston');
const router = express.Router();
const generate = require('../generation/generate');
const Joi = require('@hapi/joi');

router.get('/', (req, res) => {
    const schema = Joi.object({
        number: Joi.number()
            .min(1)
            .max(500)
            .required(),
        region: Joi.string()
            .trim()
            .min(1)
            .max(30)
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    const reg = (req.body.hasOwnProperty('region')) ? req.body.region : '';
    generate.generate(req.body.number, reg).catch((err) => {
        res.status(500);
    }).then((response) => {
        res.send(response);
    });

})

module.exports = router;