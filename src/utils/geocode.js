const request = require('request');

const geocode = (address, limit, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3N0MDciLCJhIjoiY2s0ODczcmw2MTJ2eTNscTc5b2dkMG96OCJ9.FDbPFK9Qiwm3PjVudu31IA&limit=${encodeURIComponent(limit)}`;
    //Object shorthand for url: url to only url below.
    console.log("The address is "+address);
    
    request({url, json: true},(error, { body } = {}) => {
       
        if (error) {
            console.log('Unable to connect');
            callback('Unable to connect to location services',undefined);
        } else if (body.features.length === 0) {
            callback('Could not find matching results',undefined);
        }else {
            //console.log("Message " + response.message);
            // console.log(response);
            //Since we have used json: true above. We don't have to parse the body explicitly in JSON Object.
            // const data = JSON.parse(body);
            console.log(`Longitude is ${body.features[0].center[0]} and Latitude is ${body.features[0].center[1]}`);
            latitude = body.features[0].center[1];
            longitude = body.features[0].center[0];
            const data = {
                latitude: latitude,
                longitude: longitude,
                location: body.features[0].place_name
            }
            //console.log(response.statusCode);
            callback(undefined, data);
        }
    })
};



module.exports = geocode;