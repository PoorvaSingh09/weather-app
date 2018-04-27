const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      alias: 'address',
      describe: 'Address to fetch weather for',
      demand: true,
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAlhrsSr7YuCpu4EZxB_e8g7CtoCZXyFBE`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  // console.log(response.data);
  var latitude = response.data.results[0].geometry.location.lat
  var longitude = response.data.results[0].geometry.location.lng

  var weatherURL = `https://api.darksky.net/forecast/8162ed4568469fcc1cc0c8f4f3df3a7a/${latitude},${longitude}`;
  return axios.get(weatherURL);

}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
