console.log("Welcome To DB Connectivity");
const exp = require('express');
const app = exp();
const mongoose = require('mongoose');
var  userRoutes = require('./User/User.controller');
var categoryRoutes = require('./Categories/Category.controller');
var router = exp.Router();
//To extract html content

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(exp.json());       // to support JSON-encoded bodies
app.use(exp.urlencoded({extended:true})); // to support URL-encoded bodies

function DBCon()
{
    mongoose.connect('mongodb://localhost:27017/ShareEduDB',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
    mongoose.connection.on('connected',function(){
        console.log("Connected to ShareEduDB");  
    });
    mongoose.connection.on('error',function(error){
        console.log("Error while connecting: "+ error);
    });
    mongoose.connection.on('disconnected',function(){
        console.log("Disconnected: ");
    });
}
DBCon();

//Error Handling
app.use(function (request,response,next) { 
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Credential","true");
    response.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});
   
app.listen(7762,function(){
    console.log('Listening on port: 7762');
});


app.use('/conDB',router);
userRoutes(router);
categoryRoutes(router);
