const express = require('express');
const winston = require('winston');
const router = express.Router();
const markovGenerator = require('../markov/markov');
const Joi = require('@hapi/joi');

router.get('/', (req, res) => {
    const schema = Joi.object({
        examples: Joi.array()
            .min(20)
            .max(300)
            .unique()
            .required()
            .items(Joi.string())
    });
    const { error, value } = schema.validate(req.body);
    if (error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    const chain = markovGenerator.generateMarkovChain(req.body.examples);
    res.send(chain);
})

//TODO: sanitize individual names (alpha only, lowercase)

module.exports = router;