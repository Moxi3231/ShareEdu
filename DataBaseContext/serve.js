console.log("Welcome To DB Connectivity");
const exp = require('express');
const app = exp();
const mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs');
var cors = require('cors');
//Routes
var userRoutes = require('./User/User.controller');
var categoryRoutes = require('./Categories/Category.controller');
var videoRoutes = require('./Video/Video.controller');
var usercategoryroutes = require('./UserCategory/UserCategory.controller');
var TextBookroutes = require('./Textbook/Textbook.controller');
var noteRoutes = require('./Notes/Notes.controller');
//Router
var router = exp.Router();
var email = require('./EmailTransporter');
//To extract html content
var bodyParser = require('body-parser');

//console.log(__dirname);
app.use(cors());



app.post('/file2upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var npath = __dirname + '/../src/assets/Video/' + files.file.name;
        fs.copyFile(oldpath, npath, function (err) {
            //console.log(npath);
            if (err) {
                console.error(err);
                res.send({message:"Not Uploaded",flag:false});
            }
            else {
                //console.log("FileUploded");
                res.send({message:"Uploaded",flag:true});
            }
        });
        return;
    });
});

app.post('/textbook2upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var npath = __dirname + '/../src/assets/Textbook/' + files.file.name;
        fs.copyFile(oldpath, npath, function (err) {
            //console.log(npath);
            if (err) {
                console.error(err);
                res.send({message:"Not Uploaded",flag:false});
            }
            else {
                //console.log("FileUploded");
                res.send({message:"Uploaded",flag:true});
            }
        });
        return;
    });
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(exp.json());       // to support JSON-encoded bodies
app.use(exp.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/conDB/SendMail',function(req,res,next){
    //console.log("Received");
    //console.log(req.body);
    //console.log(req.params['course']);
    email(req.body.course,req.body.content,req.body.subject);
    res.send({flag:true});
});

function DBCon() {
    mongoose.connect('mongodb://localhost:27017/ShareEduDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    //mongodb+srv://DB3231:BD3231@cluster1-eh8nt.mongodb.net/test?retryWrites=true&w=majority
    //mongoose.connect('mongodb+srv://DB3231:DB3231@cluster1-eh8nt.mongodb.net/ShareEduDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    mongoose.connection.on('connected', function () {
        console.log("Connected to ShareEduDB");
    });
    mongoose.connection.on('error', function (error) {
        console.log("Error while connecting: " + error);
    });
    mongoose.connection.on('disconnected', function () {
        console.log("Disconnected: ");
    });
}
DBCon();

//Error Handling
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credential", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

app.listen(7762, function () {
    console.log('Listening on port: 7762');
});


app.use('/conDB', router);
userRoutes(router);
categoryRoutes(router);
videoRoutes(router);
usercategoryroutes(router);
TextBookroutes(router);
noteRoutes(router);