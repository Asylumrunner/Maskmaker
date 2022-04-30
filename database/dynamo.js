const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
const { v4: uuidv4 } = require('uuid')
const winston = require('winston')
const client = new AWS.DynamoDB.DocumentClient()
const tableName = 'MM-MarkovChains'

module.exports.saveChain = async function saveChain(markovChain) {
    let chainKey = uuidv4()
    params = {
        TableName: tableName,
        Item: {
            ChainKey: chainKey,
            Chain: markovChain
        },
        ReturnValues: "ALL_OLD"
    }
    var request = client.put(params);
    var result = await request.promise();
    winston.info("Markov Chain saved in database with key: " + chainKey);
    return chainKey;
}

module.exports.retrieveChain = async function retrieveChain(chainKey) {
    var params = {
        TableName: tableName,
        Key: {
            "ChainKey": chainKey
        }
    }

    var request = client.get(params);
    var result = await request.promise();
    winston.info("Markov Chain retrieved from database with key: " + chainKey);
    console.log(result.Item.Chain);
    return result.Item.Chain;

}