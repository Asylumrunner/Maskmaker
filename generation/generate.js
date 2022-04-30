const winston = require('winston');
const axios = require('axios');
const util = require('util');
const traits = require('./traits');

module.exports.generate = async function generateCharacters(number, region = '', gender = '', user_attributes = []) {
    var list_of_characters = [];
    var new_character = {};
    
    var name_pool = await generateNames(number, region, gender);

    if(user_attributes && user_attributes.length) {
        var attribute_pool = generateAttributes(number, user_attributes);
    }
    else {
        var attribute_pool = generateAttributes(number);
    }

    for(var i = 0; i < number; i++) {
        new_character = {};

        new_character.name = name_pool.splice(Math.floor(Math.random() * name_pool.length - 1), 1)[0];
        new_character.traits = generateTraits(3);
        new_character.attribute = attribute_pool.splice(Math.floor(Math.random() * attribute_pool.length - 1), 1)[0];
        winston.info(util.inspect(new_character, false, null));
        list_of_characters.push(new_character);
    }
    return list_of_characters;
}

module.exports.generateWithCustomNames = async function generateCharactersWithCustomNames(number, names, user_attributes = []) {
    var list_of_characters = [];
    var new_character = {};

    if(user_attributes && user_attributes.length) {
        var attribute_pool = generateAttributes(number, user_attributes);
    }
    else {
        var attribute_pool = generateAttributes(number);
    }

    for(var i = 0; i < number; i++) {
        new_character = {};
        
        new_character.name = names.splice(Math.floor(Math.random() * names.length - 1), 1)[0];
        new_character.traits = generateTraits(3);
        new_character.attribute = attribute_pool.splice(Math.floor(Math.random() * attribute_pool.length - 1), 1)[0];
        winston.info(util.inspect(new_character, false, null));
        list_of_characters.push(new_character);
    }
    return list_of_characters;
}

async function generateNames(number, region='', gender = '') {
    var request_url = util.format('http://randomuser.me/api/?inc=name&noinfo&results=%d', number);
    if(region){
        request_url += util.format('&nat=%s', region);
    }
    if(gender){
        request_url += util.format('&gender=%s', gender);
    }
    try {
        var response = await axios.get(request_url);

        if(response.status != 200){
            winston.error("Request to Names API failed");
            throw new Error("Name generation failed");
        }
        var name_list = [];

        response.data.results.forEach((result) => {
            name_list.push(util.format("%s %s", result.name.first, result.name.last));
        })
        winston.info("Names generated");
        console.log(name_list);
        return name_list;
    }
    catch (ex) {
        winston.error("Request to names API failed: " + ex);
        throw new Error("Name generation failed");
    }
    
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
    var attribute_block = {};
    while(attribute_list.length < number){
        attribute_block = {};
        attributes.forEach((attribute) => {
            var dice_roll = 0;
            for(let i = 0; i < 2; i++){
                dice_roll += Math.floor(Math.random() * 6) + 1
            }
            if(dice_roll == 2){
                attribute_block[attribute] = "Horrible";
            }
            else if (dice_roll > 2 && dice_roll < 6){
                attribute_block[attribute] = "Below Average";
            }
            else if (dice_roll >= 6 && dice_roll < 9){
                attribute_block[attribute] = "Average";
            }
            else if (dice_roll >= 9 && dice_roll < 12){
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