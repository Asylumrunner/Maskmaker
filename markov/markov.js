const util = require('util');
const winston = require('winston');

module.exports.generateMarkovChain = function generateMarkovChain(terms) {
    var sumsChain = createEmptyChain();
    terms.forEach((term) => {
        correctedTerm = term.toLowerCase();
        sumsChain[0][charToArrayIndex(correctedTerm[0]) - 1]++;
        for(var i = 0; i < term.length - 1; i ++){
            sumsChain[charToArrayIndex(correctedTerm[i])][charToArrayIndex(correctedTerm[i+1]) - 1]++;
        }
    });
    return convertSumsToPercentages(sumsChain);
}

module.exports.runChain = function runChain(markovChain, length) {
    var generatedTerm = "";
    var priorIndex = 0;
    
    for(var i = 0; i < length; i++){
        var randomNumber = Math.random()
        var runningTotal = 0.0;
        for(var j = 0; j < 27; j++){
            runningTotal += markovChain[priorIndex][j];
            if(runningTotal >= randomNumber){
                priorIndex = j+1;
                generatedTerm += arrayIndexToChar(j);
                break;
            }
        }
    }

    return generatedTerm;
}

module.exports.testChain = function testChain(markovChain) {
    try {
        for(var i = 0; i < markovChain.length; i++){
            sum = 0;
            for(var j = 0; j < markovChain[i].length; j++){
                if(Number.isNaN(markovChain[i][j])){
                    return false;
                }
                sum += markovChain[i][j];
            })
            if(Math.abs(sum - 1) > 0.01){
                return false;
            }
        })
        return true;
    }
    catch (err){
        winston.error("Exception while validating markov chain: " + err);
        return false;
    }
}

function convertSumsToPercentages(sumsChain) {
    var finalChain = createEmptyChain();
    for (var i = 0; i < sumsChain.length; i++ ){
        var columnTotal = sumsChain[i].reduce((a, b) => {return a + b});
        for(var j = 0; j < sumsChain[i].length; j++){
            finalChain[i][j] = sumsChain[i][j]/columnTotal;
            if(j == sumsChain[i].length - 1){
                var diff = 1 - sumsChain[i].reduce((x, y) => {return x + y}, 0);
                finalChain[i][j] += diff;
            }
        }
    }
    return finalChain;
}


function createEmptyChain() {
    chain = [];
    for(var i = 0; i < 27; i++){
        chain.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return chain;
}

function charToArrayIndex(character){
    var val = character.charCodeAt(0) - 96;
    return val;
}

function arrayIndexToChar(index){
    return String.fromCharCode(index + 97);
}
