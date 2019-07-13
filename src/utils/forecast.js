const request = require('request');

const forecast = (data, callback) => {
  const url = `https://api.darksky.net/forecast/53233272b2c2df51949e888c9e7a2ee6/${data.latitude},${data.longitude}/?units=auto`;

  request({url: url, json: true}, (error, response) => {
    if(error){
      callback('Unable to connect to weather services', undefined);
    }
    else if(response.body.error){
      callback('Unable to find location', undefined);
    }
    else{
      callback(undefined ,`${response.body.daily.data[0].summary}The min temperature today is ${response.body.daily.data[0].temperatureMin} degrees while the max temperature is ${response.body.daily.data[0].temperatureMax} degrees in ${data.location}`);
    }
  });
}

module.exports = forecast;


