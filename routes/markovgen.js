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
            .items(Joi.string().alphanum().lowercase().trim())
    });
    const { error, value } = schema.validate(req.body);
    if (error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    else{
        const chain = markovGenerator.generateMarkovChain(req.body.examples);
        if(markovGenerator.testChain(chain)){
            res.send(chain);
        }
        else{
            winston.error("The generated test data was incomplete, and yielded an incomplete chain");
            res.status(400).send("The generated test data was incomplete, and yielded an incomplete chain");
            //TODO: Provide a more helpful error message about what was wrong
        }
    }
})

router.get('/createnames', (req, res) => {
    const schema = Joi.object()
})

module.exports = router;