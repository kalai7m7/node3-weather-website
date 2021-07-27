const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FsYWk3bSIsImEiOiJja3FzYWxuZ3AwOXg5MnFxbXJtMjhwYXYzIn0.hxZ2R6M9-SQz-XanXx9ofw&limit=1'

    //request( {url: url, json: true}, (error, response) => {
    request( {url, json: true}, (error, {body} ) => {
        if( body==undefined || error ){
            callback( 'Unable to connect to location services! Check your Internet!', undefined)
        } else if ( body.message || body.features.length === 0 ){
            callback('Unable to find location. Try another search!',undefined)
        } else {
            callback( undefined, { 
                longitude : body.features[0].center[0] ,
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode