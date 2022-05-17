//install packages and initiate
const express = require('express');
const app = express();
app.use(express.static('web-app'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
const req = require('express/lib/request');
app.use(cors());

//server info
const port = 8080;
const server = app.listen(port, listening);

function listening(){
  console.log(`running on localhost: ${port}`);
};

//Empty object to act as endpoint for all routes
projectData = {};

//get route
app.get('/all', function(request, response) {
  response.send(projectData);
});


app.post('/all', addWeather);

function addWeather(request, response) {
  newEntry = {
    temp: request.body.temp,
    date: request.body.date,
    zip: request.body.zip,
    city: request.body.city,
    feelings: request.body.feelings
  };
  //console.log(newEntry);
  projectData = newEntry;
  response.send(projectData);
  //console.log(projectData);
};





/*
//Animal API
const fakeData = {
  animal: 'lion',
  fact: 'lions are fun'
};

//get animal data
app.get('/fakeAnimalData', getFakeData);

function getFakeData(request, response) {
  response.send(fakeData);
}

const animalData = [];

app.get('/all', getData);
function getData(request, response){
  response.send(animalData);
};

app.post('/addAnimal', addAnimal);

function addAnimal(request, response) {
  newEntry = {
    animal: request.body.animal,
    fact: request.body.fact,
    favorite: request.body.favorite
  };

  animalData.push(newEntry);
  response.send(animalData);
};
*/