// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json())





// Setup Server
//port
const PORT = process.env.PORT || 3232;

//route
app.get('/g', (req, res) => {
    //res.json({ message: 'success', feeling: 'good' }); //to check 
    res.send(projectData);
})

app.post('/a', (req, res) => {

    const zipCode = req.body.zipCodeV;
    const feeling = req.body.feelingV;
    const temp = req.body.tempV;
    const country = req.body.countryV;
    const city = req.body.name;
    const date = req.body.newDate;
    projectData = { zipCode: zipCode, feeling: feeling, temp: temp, country: country, city: city, date: date };
    console.log(req.body);
    projectData = req.body;
    res.send(projectData);
});


/*app.post('/a', (req, res) => {

    const zipCode = req.body.zipCodeV;
    const feeling = req.body.feelingV;
    const temp = req.body.tempV;
    const country = req.body.countryV;
    const city = req.body.name;
    const date = req.body.newDate;
    projectData.push({ zipCode: zipCode, feeling: feeling, temp: temp, country: country, city: city, date: date });
    res.json(req.body);
    projectData.push(req.body);


    console.log('i got a request');
    console.log(req.body);



});*/

//listen 
app.listen(PORT, () => console.log('server is running on ', PORT));