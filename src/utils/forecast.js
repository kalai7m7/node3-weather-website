const request = require('request');

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5b2b677a25a54ec8e3deed928537d699&query='+ latitude +','+ longitude + '&units=f';

    //request( {url: url, json: true}, (error, response) => {
    request( {url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location!', undefined)
        } else {
            const forecast = body.current
            callback( undefined, forecast.weather_descriptions[0] + ". It is currently "+ forecast.temperature + " degrees out and there is a "+ forecast.precip+"% chance of rain.")
        }
    })
}

module.exports = forecast