const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' })
const crypto = require('crypto')
const winston = require('winston')
const client = new AWS.DynamoDB.DocumentClient()
const tableName = 'MM-MarkovChains'

module.exports.saveChain = function saveChain(markovChain) {
    reducedChain = markovChain.reduce( (previousColumn, nextColumn) => previousColumn + 
        nextColumn.reduce( (previousValue, nextValue) => previousValue + nextValue, ""),
        ""
    );

    chainKey = crypto.createHash('md5').update(reducedChain).digestr('hex');

}

module.exports.retrieveChain = function retrieveChain(chainKey) {
    var params = {
        TableName: tableName,
        Key: {
            HashKey: chainKey
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