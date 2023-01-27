
//making actual HTTP REQUEST USING PARAMETER SET BY MAPBOX FILE.

const request = require('request')
// const yargs = require('yargs')
const mapbox=require('./mapbox')

const address=require('../app')



// const address=yargs.argv._[0];
if(address){
    console.log(address)
mapbox(address,({lattitude,longitude,placename}) => {
    /* use "units=s" for kelvin,"units=f" for fareinheight,"units=m" for celcius.*/
    let url = `http://api.weatherstack.com/current?access_key=98f1f06e4f150345a5d1cbd9713d260b&query=${lattitude},${longitude}&units=m`;
    /* for automating parsig pass one json:true opion to get parsed data.*/
    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log('unable to connect to weather service')
        }
        else if (response.body.error) {
            console.log('unable to find location'+response.body)
        }
        else {
            // console.log(response.body.current);
            const data={
                temperature:response.body.current.temperature,
                placename:placename,
                feelslike:response.body.current.feelslike
            }
            // console.log('there is temperature is '+response.body.current.temperature+'. there is '+response.body.current.precip+' chance of rain today')
            console.log(placename+"..."+response.body.current.weather_descriptions[0] + '. surrounding temperature is ' + response.body.current.temperature + '. it feels like ' + response.body.current.feelslike)
            module.exports=data;
        }
    })

})
}
else{
    console.log('please provide address')
}

