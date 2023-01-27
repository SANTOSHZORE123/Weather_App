
const express=require('express')
const path=require('path')
const hbs=require('hbs')
const mapbox = require('./using_request_npm_package/geocode')
const forecast = require('./using_request_npm_package/forecast')

const app=express()
const port=process.env.PORT || 3000


//define paths for express routing
const publicDirectoryPath=path.join(__dirname,'../public')  

const viewsDirectoryPath=path.join(__dirname,'../templates/views');

const partialsDirectoryPath=path.join(__dirname,'../templates/partials')

//to servee static files in public folder.
app.use(express.static(publicDirectoryPath))      



//setup view engine as handlebars and setup vies location.
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath);


//serving views file by view engine by adding some properties in that using object.by doing that server serves dynamic files to client.
app.get('',(req,res)=>{
    res.render('index',{  //by passing object we can customize our "index.hbs" file.
        'title':'santosh',
        'name':'santosh zore',
        'created_by':'index'
    })  //this is used to renders specified viwes.
    console.log(app.get('view engine'));// to print value associated with "view engine".
})

app.get('/help',(req,res)=>{
    res.render('help',{  //by passing object we can customize our "index.hbs" file.
        'title':'help me',
        'name':'i am zore',
        'created_by':'help'
    })  //this is used to renders specified viwes.
    console.log(app.get('view engine'));// to print value associated with "view engine".
})




//setting "weather" route to handle request

app.get('/weathers',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please provide address to send forecast'
        })
    }
    const address=req.query.search;
     mapbox(address,(error,data)=>{
         if(error!==undefined){
            res.send({error:error})
         }
         else{
            
             forecast(data,(error,obj)=>{
                if(error!==undefined){
                    res.send({error:error})
                 }
                 else{
                    res.send(obj)
                 }
             })
         }
     })
    
})


//to handle routes with "/help/anything" 
app.get('/help/*',(req,res)=>{
    res.render('error_page',{'message':'Help article not found'});
})

//to handle request with any routes.
//to match any typed URL
//hence we mentioned it at end because if we mentioned it above then it match all routes (other usefull routes also) and returns same message "page not found" even there is page at specified url;
app.get('*',(req,res)=>{
    res.render('error_page',
    {'message':'page not found'});
})
app.listen(port,()=>{
    console.log('running on port no 8000')
})


