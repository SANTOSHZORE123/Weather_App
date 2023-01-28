
//making actual HTTP REQUEST USING PARAMETER SET BY MAPBOX FILE.

const request = require('request')
// const yargs = require('yargs')


// const address=yargs.argv._[0];

const forecast=({lattitude,longitude,placename}={},callback) => {
    
    /* use "units=s" for kelvin,"units=f" for fareinheight,"units=m" for celcius.*/
    let url = `http://api.weatherstack.com/current?access_key=fd10b87c9c02cd168f5a724ec6f6ce62&query=${lattitude},${longitude}&units=m`;
   
    /* for automating parsig pass one json:true opion to get parsed data.*/
     request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service',undefined)
        }
        else if (response.body.error) {
            callback('unable to find location'+response.body,undefined)
        }
        else {
            // console.log(response.body.current);
            // console.log('there is temperature is '+response.body.current.temperature+'. there is '+response.body.current.precip+' chance of rain today')
            const obj={
                placename:placename,
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike
            }
            console.log(placename+"..."+response.body.current.weather_descriptions[0] + '. surrounding temperature is ' + response.body.current.temperature + '. it feels like ' + response.body.current.feelslike)
            
             callback(undefined,response.body)
        }
    })
   
}

module.exports=forecast;



