const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
const { v4: uuidv4 } = require('uuid')
const winston = require('winston')
const client = new AWS.DynamoDB.DocumentClient()
const tableName = 'MM-MarkovChains'

module.exports.saveChain = function saveChain(markovChain) {
    let chainKey = uuidv4()
    params = {
        TableName: tableName,
        Item: {
            ChainKey: chainKey,
            Chain: markovChain
        }
    }
    client.put(params, function(error, data) {
        if (error) {
            winston.error("Exception while inserting markov chain into database: " + error);
            return null;
        }
        else {
            winston.info("Markov chain inserted. Chain key: " + chainKey);
        }
    });

    return chainKey;
}

module.exports.retrieveChain = function retrieveChain(chainKey) {
    var params = {
        TableName: tableName,
        Key: {
            "ChainKey": chainKey
        }
    }

    client.get(params, function(error, data) {
        if (error) {
            winston.error("Exception while retrieving markov chain from database: " + error)
            return null;
        }
        else{
            console.log(data.Item.Chain);
            return data.Item.Chain;
        }
    });
}