const express = require('express');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid')
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

router.post('/getchain', async function(req, res) {
    const schema = Joi.object({
        chainKey: Joi.string()
            .required()
    });
    const {error, value} = schema.validate(req.body);
    if (error){
        winston.error(error);
        console.log('buttass');
        res.status(400).send(error.details[0].message);
    }
    var markovChain = await databaseHandler.retrieveChain(req.body.chainKey);
    res.send({'chain': markovChain});
})

router.post('/createnames', (req, res) => {
    const schema = Joi.object({
        chain: Joi.array()
            .custom((value, helpers) => {
                if(!markovGenerator.testChain(value)){
                    return helpers.error("Markov Chain provided is invalid")
                }
                else {
                    return value;
                }
            }),
        chainKey: Joi.string(),
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
    if (!req.body.chain && ! req.body.chainKey){
        winston.error("Either a Markov chain or a chain database key must be provided");
        res.status(400).send("Either a Markov chain or a chain database key must be provided");
    }

    var markovChain = req.body.chain ? req.body.chain : databaseHandler.retrieveChain(req.body.chainKey);
    const numberOfNames = (req.body.hasOwnProperty('count')) ? req.body.count : 1;
    var resultsList = []
    for(var i = 0; i < numberOfNames; i++){
        var generatedLength = req.body.minlength + Math.round(Math.random() * (req.body.maxlength - req.body.minlength));
        var uncapitalizedTerm = markovGenerator.runChain(markovChain, generatedLength);
        resultsList.push(uncapitalizedTerm.charAt(0).toUpperCase() + uncapitalizedTerm.slice(1));
    }
    res.send({names: resultsList});

})

module.exports = router;