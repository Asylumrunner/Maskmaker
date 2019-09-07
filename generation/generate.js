const winston = require('winston')

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