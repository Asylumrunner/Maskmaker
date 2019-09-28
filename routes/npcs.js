const express = require('express');
const winston = require('winston');
const router = express.Router();
const npcCreator = require('../generation/generate');
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
            .max(30),
        gender: Joi.string()
            .trim()
            .valid('male', 'female'),
        attributes: Joi.array()
            .min(1)
            .max(12)
            .unique()
            .items(Joi.string())
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    const reg = (req.body.hasOwnProperty('region')) ? req.body.region : '';
    const gend = (req.body.hasOwnProperty('gender')) ? req.body.gender : '';
    const atts = (req.body.hasOwnProperty('attributes')) ? req.body.attributes : [];
    npcCreator.generate(req.body.number, reg, gend, atts).catch((err) => {
        res.status(500);
    }).then((response) => {
        res.send(response);
    });

})

router.get('/custom-names', (req, res) => {
    const schema = Joi.object({
        number: Joi.number()
            .min(1)
            .max(500)
            .required(),
        attributes: Joi.array()
            .min(1)
            .max(12)
            .unique()
            .items(Joi.string()),
        names: Joi.array()
            .min(Joi.ref('number'))
            .required()
            .items(Joi.string())
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        winston.error(error);
        res.status(400).send(error.details[0].message);
    }
    const atts = (req.body.hasOwnProperty('attributes')) ? req.body.attributes : [];
    npcCreator.generateWithCustomNames(req.body.number, req.body.names, atts).catch((err) => {
        res.status(500);
    }).then((response) => {
        res.send(response);
    });
})

module.exports = router;