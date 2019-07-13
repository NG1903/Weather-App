const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

//Define Paths for Express COnfig
const publicDirPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

//Setup handelbars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths);

//Setup static
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
  res.render('index', {
    name : 'Naman',
    title : 'Weather'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.location){
    return res.send({
      error : 'You must provide Location'
    })
  }
  geocode(req.query.location, (error, response) => {
    if(error){
      res.send({
        error : error
      });
    }
    else{
      forecast(response, (error, response) => {
         if(error){
           res.send({
             error: error
           });
         } 
         else{
           res.send({
            Weather_Report : response
           });
         }
      });
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name : 'Naman',
    title : 'About'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText : 'Just your Plain Help Page',
    name : 'Naman',
    title : 'Help'
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    errorMessage : '404 Error',
    name: 'Naman'
  });
});

app.listen(PORT, () => {
  console.log('Listening to PORT ' + PORT);
});