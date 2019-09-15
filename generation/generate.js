const winston = require('winston');
const axios = require('axios');
const util = require('util');
const unidecode = require('unidecode');
//const traits = require('./traits')();

module.exports.generate = async function generateCharacters(number, region = '', user_attributes = []) {
    var list_of_characters = [];
    var new_character = {};
    
    var name_pool = await generateNames(number, region);

    if(user_attributes && user_attributes.length) {
        var attribute_pool = generateAttributes(number, user_attributes);
    }
    else {
        var attribute_pool = generateAttributes(number);
    }

    for(var i = 0; i < number; i++) {
        new_character = {};

        new_character.name = name_pool.splice(Math.floor(Math.random() * name_pool.length - 1), 1)[0];
    //     list_of_traits = [];
    //     for(var j = 0; j < 3; j++){
    //         list_of_traits.push(trait_pool.splice(Math.floor(Math.random() * trait_pool.length - 1), 1));
    //     }
    //     new_character.traits = list_of_traits;

        new_character.attribute = attribute_pool.splice(Math.floor(Math.random() * attribute_pool.length - 1), 1)[0];
        winston.info(util.inspect(new_character, false, null));
        list_of_characters.push(new_character);
    }
    return list_of_characters;
}

async function generateNames(number, region='') {
    var request_url = util.format('http://uinames.com/api/?amount=%d&maxlen=20', number);
    if(region){
        request_url += util.format('&region=%s', region);
    }
    try {
        var response = await axios.get(request_url);
        if(response.status != 200){
            winston.error("Request to Names API failed");
            throw new Error("Name generation failed");
        }
        var name_list = [];

        //The uinames API does a very stupid thing where if you only ask for a single name
        //it returns it as a single item, outside of an array. This if statement checks for
        //that and wraps that single item in an array to ensure proper iteration
        if(!Array.isArray(response.data)){
            response.data = [response.data]
        }

        response.data.forEach((name) => {
            name_list.push(unidecode(util.format("%s %s", name.name, name.surname)));
        })
        winston.info("Names generated");
        return name_list;
    }
    catch (ex) {
        winston.error("Request to names API failed: " + ex);
        throw new Error("Name generation failed");
    }
    
}

// function generateTraits(number) {
//     var trait_list = [];
//     while(trait_list.length < number){
//         trait_list.push(traits[Math.floor(Math.random() * (traits.length - 1))]);
//     }
//     return trait_list;
// }

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