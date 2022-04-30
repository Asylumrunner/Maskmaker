const express = require('express');
const winston = require('winston');
const router = express.Router();
const markovGenerator = require('../markov/markov');
const databaseHandler = require('../database/dynamo')
const Joi = require('@hapi/joi');

router.post('/', (req, res) => {
    const schema = Joi.object({
        examples: Joi.array()
            .min(20)
            .max(300)
            .unique()
            .required()
            .items(Joi.string().alphanum().lowercase().trim()),
        saveChain: Joi.boolean()
            .default(false)
    });
    const { error, value } = schema.validate(req.body);
    if (error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    else{
        const chain = markovGenerator.generateMarkovChain(req.body.examples);
        if(!markovGenerator.testChain(chain)){
            winston.error("The generated test data was incomplete, and yielded an incomplete chain");
            res.status(400).send("The generated test data was incomplete, and yielded an incomplete chain");
            //TODO: Provide a more helpful error message about what was wrong
        }

        if (req.body.saveChain) {
            var chainKey = databaseHandler.saveChain(chain);
        }
        else{
            var chainKey = null
        }
        res.send({chain: chain, chainKey: chainKey});
    }
})

router.post('/createnames', (req, res) => {
    const schema = Joi.object({
        chain: Joi.array()
            .required()
            .custom((value, helpers) => {
                if(!markovGenerator.testChain(value)){
                    return helpers.error("Markov Chain provided is invalid")
                }
                else {
                    return value;
                }
            }),
        minlength: Joi.number()
            .required()
            .min(1)
            .max(20),
        maxlength: Joi.number()
            .required()
            .min(2)
            .max(20)
            .greater(Joi.ref('minlength')),
        count: Joi.number()
            .min(1)
            .max(10)
            .required()
    });
    const {error, value} = schema.validate(req.body);
    if (error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }

    const numberOfNames = (req.body.hasOwnProperty('count')) ? req.body.count : 1;
    var resultsList = []
    for(var i = 0; i < numberOfNames; i++){
        var generatedLength = req.body.minlength + Math.round(Math.random() * (req.body.maxlength - req.body.minlength));
        var uncapitalizedTerm = markovGenerator.runChain(req.body.chain, generatedLength);
        resultsList.push(uncapitalizedTerm.charAt(0).toUpperCase() + uncapitalizedTerm.slice(1));
    }
    res.send({names: resultsList});

})

module.exports = router;