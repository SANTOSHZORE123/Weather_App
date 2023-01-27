const request =require('request')


//firing query to get longitude and latitute using mapbox
const mapbox = (x,callback) => {
             url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${x}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2FudG9zaHpvcmUiLCJhIjoiY2xjMHM0a3BkMzlkZzN2cW5vMmMzdHliaCJ9.XthZC6qTwUQh4iF7xO8a0w`;
             
     request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location services',undefined)
        }
        else if (response.body.features[0] === undefined ) {
            callback('no results found for the location',undefined)
        }
        else {
            // console.log(response)
            let lattitude = response.body.features[0].center[1]
            let longitude = response.body.features[0].center[0]
            console.log('longitude= ' + response.body.features[0].center[0] + '. lattitude= ' + response.body.features[0].center[1])
            const data={
                lattitude:lattitude,
                longitude:longitude,
                placename:response.body.features[0].place_name
            }
            callback(undefined,data);
            
        }
    })
    
}
module.exports=mapbox;


