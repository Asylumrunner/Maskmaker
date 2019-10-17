const express = require('express');
const winston = require('winston');
const router = express.Router();
const markovGenerator = require('../markov/markov');
const Joi = require('@hapi/joi');

router.post('/', (req, res) => {
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

router.post('/createnames', (req, res) => {
    const schema = Joi.object({
        chain: Joi.array()
            .required(),
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

    const chainValid = markovGenerator.testChain(req.body.chain);
    if(chainValid) {
        //Integrate this logic into Joi with any.custom()
        const numberOfNames = (req.body.hasOwnProperty('count')) ? req.body.count : 1;
        var resultsList = []
        for(var i = 0; i < numberOfNames; i++){
            var generatedLength = req.body.minlength + Math.round(Math.random() * (req.body.maxlength - req.body.minlength));
            var uncapitalizedTerm = markovGenerator.runChain(req.body.chain, generatedLength);
            resultsList.push(uncapitalizedTerm.charAt(0).toUpperCase() + uncapitalizedTerm.slice(1));
        }
        res.send(resultsList);
    }
    else{
        winston.error("The provided Markov Chain is invalid.");
        res.status(400).send("The provided Markov Chain is invalid");
    }


})

module.exports = router;