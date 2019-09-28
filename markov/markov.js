const util = require('util');
const winston = require('winston');

module.exports.generateMarkovChain = function generateMarkovChain(terms) {
    var sumsChain = createEmptyChain();
    terms.forEach((term) => {
        correctedTerm = term.toLowerCase();
        sumsChain[0][charToArrayIndex(correctedTerm[0])]++;
        for(var i = 0; i < term.length - 1; i ++){
            sumsChain[charToArrayIndex(correctedTerm[i])][charToArrayIndex(correctedTerm[i+1])]++;
        }
    });
    return convertSumsToPercentages(sumsChain);
}

module.exports.runChain = function runChain(markovChain, length) {
    var generatedTerm = "";
    var priorIndex = 0;
    
}

function convertSumsToPercentages(sumsChain) {
    var finalChain = createEmptyChain();
    for (var i = 0; i < sumsChain.length; i++ ){
        var columnTotal = sumsChain[i].reduce((a, b) => {return a + b});
        for(var j = 0; j < sumsChain[i].length; j ++){
            finalChain[i][j] = sumsChain[i][j]/columnTotal;
        }
    }
    return finalChain;
}
function createEmptyChain() {
    chain = [];
    for(var i = 0; i < 28; i++){
        chain.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return chain;
}

function charToArrayIndex(character){
    return character.charCodeAt(0) - 96;
}

function arrayIndexToChar(index){
    return String.fromCharCode(index + 96);
}
