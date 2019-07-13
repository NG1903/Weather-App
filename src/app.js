const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

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
    name : 'Naman'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.location){
    return res.send({
      error : 'You must provide qs'
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
      })
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name : 'Naman'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae soluta asperiores velit reiciendis libero magni sequi consequatur unde repudiandae iure assumenda veritatis nostrum cumque doloribus ut, quis impedit non expedita.',
    name : 'Naman'
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    errorMessage : '404 Error',
    name: 'Naman'
  });
});

app.listen(3000, () => {
  console.log('Listening to PORT 3000');
})
