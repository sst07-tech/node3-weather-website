const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Define paths for express config.
const viewsPath = path.join(__dirname,'../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');


const geocode = require('./utils/geocode');
const weather = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

console.log(__filename);

const app = express();

//app.com
//app.com/help
//app.com/about
//app.com/weather

//Handlebars template engine: The most important use of Handlebars, and any templating engine, 
//is to keep your HTML pages simple and clean and decoupled from the logic-based JavaScript files, and Handlebars serves this purpose well. Indeed, 
//Dust. js is also a logic-less templating engine and a worthy alternative to Handlebars
// By using set we can define hbs as view engine. hbs is the npm library where the handlebar template engine is used in background.
// Setup handlebars engine and views location.
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Use of path.join: The path module provides utilities for working with file and directory paths. 
// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// The below commented code won't execute now because of the code written above. Both are targeting the root.
// app.get('', (req,res) => {
//     res.send('Hello Express!');
//     res.send
// })

// app.get('/help', (req,res) => {
//     // res.send('Help page!');
//     res.send({
//         name: 'Shashank',
//         city: 'Bangalore'
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>Weather App</h1>');
// })


const limit = 1;
var latitude;
var longitude;

// With the view engine render is used instead of send.
app.get('', (req, res) => {
    res.render('index', {
        name: 'Shashank',
        title: 'Weather'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Shashank',
        title: 'Weather'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shashank'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please send a address field'
        })
    }
    // geocode(req.query.address,limit,(error, data) => {
    // The below line is destructuring the data in above line into latitude, longitude, location. And to avoid an undefined situtaion they are set to a default value as {}     
    geocode(req.query.address,limit,(error, { latitude, longitude, location }= {}) => {    
        if(error){
            console.log("Error returned is "+error);
            return res.send({
                error: error
            })
        }else{
            //console.log('Data',data);
            console.log('Data',latitude+' '+longitude);
            //const url = `https://api.darksky.net/forecast/54721615fbad2c8f43dfe1bd5bf1d2e4/${data.latitude},${data.longitude}`;
            const url = `https://api.darksky.net/forecast/54721615fbad2c8f43dfe1bd5bf1d2e4/${latitude},${longitude}`;
            weather(url, (error, body) => {
                res.send({
                    address: location,
                    latitude: latitude,
                    longitude: longitude,
                    forecast: body.currently.summary,
                    temperature: body.currently.temperature
                })
                console.log('Body',body.currently);
            })
        } 
    });   
     
    // res.send({
    //     forecast: '20 degrees celcius',
    //     location: req.query.address
    // });
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

// app.get('/help/*',(req,res) => {
//     res.send('Help article not found');
// })


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Shashank'
    });
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Shashank'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
