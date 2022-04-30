const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' })
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
            winston.error("Expection while inserting markov chain into database: " + error);
            return null;
        }
        else {
            return chainKey;
        }
    });
}

module.exports.retrieveChain = function retrieveChain(chainKey) {
    var params = {
        TableName: tableName,
        Key: {
            ChainKey: chainKey
        }
    }

    client.get(params, function(error, data) {
        if (error) {
            winston.error("Exception while retrieving markov chain from database: " + error)
            return null;
        }
        else{
            //deserialize the chain and return it
            console.log(data);
        }
    });
}