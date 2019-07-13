const request = require('request');

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGV5aGkiLCJhIjoiY2p5MG1lNmx2MDQ3ZzNpcGN0NmgzdG0wciJ9.l7O1cbPXwGXHdO6A5O1JEg&limit=1`;
  request({url : geoUrl, json: true}, (error, response) =>{
    if(error) {
      callback('Unable to retrieve location', undefined)
    }
    else if(response.body.features.length === 0){
      callback('Try in with a valid Location', undefined);
    }
    else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      callback(undefined, {latitude, longitude, location});
    }
  });
}

module.exports = geocode;