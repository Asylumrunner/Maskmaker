const winston = require('winston');
const axios = require('axios');
const util = require('util');
const unidecode = require('unidecode');
const traits = require('traits')

function generateCharacters(number, user_attributes = []) {
    var list_of_characters = [];
    var name_pool = generateNames(number);
    winston.info("Names generated");

    var trait_pool = generateTraits(number * 3);
    winston.info("Generated traits");

    if(user_attributes) {
        var attribute_pool = generateAttributes(number, user_attributes);
    }
    else {
        var attribute_pool = generateAttributes(number);
    }
    winston.info("Generated attributes");

    for(var i = 0; i < number; i++) {
        new_character = {};

        new_character.name = name_pool.splice(Math.floor(Math.random() * name_pool.length - 1), 1);
        list_of_traits = [];
        for(var j = 0; j < 3; j++){
            list_of_traits.push(trait_pool.splice(Math.floor(Math.random() * trait_pool.length - 1), 1));
        }
        new_character.traits = list_of_traits;

        new_character.attribute = attribute_pool.splice(Math.floor(Math.random() * attribute_pool.length - 1), 1);

        list_of_characters.push(new_character);
    }
}

async function generateNames(number, region='') {
    var request_url = util.format('http://uinames.com/api/?amount=%d&maxlen=20', number);
    if(!!region){
        request_string += util.format('&region=%s', region);
    }
    const response = await axios.get(request_url);
    
    if(response.status != 200){
        winston.error("Request to Names API failed");
        throw new Error("Name generation failed");
    }
    var name_list = [];
    response.data.forEach((name) => {
        name_list.push(unidecode(util.format("%s %s", name.name, name.surname)));
    })
    return name_list;
}

function generateTraits(number) {
    var trait_list = [];
    while(trait_list.length < number){
        trait_list.push(traits[Math.floor(Math.random() * (traits.length - 1))]);
    }
    return trait_list;
}

function generateAttributes(number, attributes = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']){
    var attribute_list = [];
    var attribute_block = {}
    while(attribute_list.length < number){
        attribute_block = {};
        attributes.forEach((attribute) => {
            var dice_roll;
            for(let i = 0; i < 2; i++){
                dice_roll += Math.floor(Math.random() * 5) + 1
            }

            if(dice_roll == 2){
                attribute_block[attribute] = "Horrible";
            }
            else if (dice_roll > 2 && dice_roll < 7){
                attribute_block[attribute] = "Below Average";
            }
            else if (dice_roll > 6 && dice_roll < 10){
                attribute_block[attribute] = "Average";
            }
            else if (dice_roll > 9 && dice_roll < 12){
                attribute_block[attribute] = "Above Average";
            }
            else if (dice_roll == 12){
                attribute_block[attribute] = "Excellent";
            }
        })
    attribute_list.push(attribute_block);
    }
    return attribute_list;
}