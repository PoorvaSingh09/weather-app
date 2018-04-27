const request = require('request');

//8162ed4568469fcc1cc0c8f4f3df3a7a
var getWeather = ((latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/8162ed4568469fcc1cc0c8f4f3df3a7a/${latitude},${longitude}`,
    json: true
  }, (error, response, body)=> {
    if (error) {
      callback('Unable to connect to forecast.io servers.');
      // console.log('Unable to connect to forecast.io servers');
    } else if (response.statusCode == 400) {
      callback('Unable to fetch weather.');
      // console.log('Unable to fetch weather.');

    } else if (body.error) {
      callback(body.error);
      // console.log(body.error);
    } else if (response.statusCode == 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
      // console.log(JSON.stringify(response, undefined, 2));
      // console.log(`Current temperature: ${body.currently.temperature}`);
    } else {
      callback('Unable to fetch weather.');
      // console.log('Unable to fetch weather');
    }
  });

});

module.exports.getWeather = getWeather;
