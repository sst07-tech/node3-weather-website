const request = require('request');

const weather = (url, callback) => {

    // while trying to destructure an object the code will fail if the object is undefined. To handle such scenarios we should assign default value like { body } = {}
    request({url, json: true},(error, { body } = {}) => {
        if(error){
            console.log('Unable to connect to weather service');
        }else if(body.error){
            console.log('Unable to find location');
        }
        else{
            // console.log(response);
            //Since we have used json: true above. We don't have to parse the body explicitly in JSON Object.
            // const data = JSON.parse(body);
            console.log("Body contains "+JSON.stringify(body));
            //console.log(response.statusCode);

            console.log(`It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipIntensity} chance of rain. Overall the forecast is ${body.currently.summary}`);
            callback(undefined,body);
        }
    })
};


// const forecast = (latitude, longitude,callback) => {
//     const url = `https://api.darksky.net/forecast/54721615fbad2c8f43dfe1bd5bf1d2e4/${latitude},${longitude}`;
//     request({url: url,json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather service', undefined);
//         }else if(response.body.error){
//             callback('unable to find location',undefined);
//         }else{
//             callback(undefined,response.body);
//         }
//     })
// }

// module.exports = forecast;

module.exports = weather;
