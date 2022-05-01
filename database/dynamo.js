const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
const { v4: uuidv4 } = require('uuid')
const winston = require('winston')
const client = new AWS.DynamoDB.DocumentClient()
const tableName = 'MM-MarkovChains'

module.exports.saveChain = async function saveChain(markovChain) {
    let chainKey = uuidv4()
    let response = {
        key: chainKey,
        err: null
    }
    params = {
        TableName: tableName,
        Item: {
            ChainKey: chainKey,
            Chain: markovChain
        },
        ReturnValues: "ALL_OLD"
    }

    try {
        var request = client.put(params);
        var result = await request.promise();
        winston.info("Markov Chain saved in database with key: " + chainKey);
    }
    catch(error) {
        response.err = error;
    }

    return response;
}

module.exports.retrieveChain = async function retrieveChain(chainKey) {
    let response = {
        chain: null,
        err: null
    }
    var params = {
        TableName: tableName,
        Key: {
            ChainKey: chainKey
        }
    }

    try {
        var request = client.get(params);
        var result = await request.promise();
        winston.info("Markov Chain retrieved from database with key: " + chainKey);
        response.chain = result;
    }
    catch(error) {
        response.err = error;
    }

    return response;
}