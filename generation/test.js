const axios = require('axios');
const util = require('util');
const unidecode = require('unidecode');

async function generate_names(number, region='') {
    var request_url = util.format('http://uinames.com/api/?amount=%d&maxlen=20', number);
    if(!!region){
        request_string += util.format('&region=%s', region);
    }
    const response = await axios.get(request_url);
    
    if(response.status != 200){
        throw new Error("Name generation failed");
    }
    console.log(response);
}

generate_names(10);

