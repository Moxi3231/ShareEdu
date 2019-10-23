var textbook = require('./Textbook.models');
var UserCategory = require('./../UserCategory/UserCategory.models');
var email = require('./../EmailTransporter');
createtextbook = function (req, res, next) {
   // console.log(req.body);
    var __book = {  
        Name: req.body.Name,
        Path: req.body.Path,
        Course: req.body.Course,
        Description:req.body.Description,
        Author:req.body.Author
    };
   // console.log(req.body.Name)
   //Sending email
    
       
    
    textbook.insertMany([__book], function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err,
                flag:true
            });
            return;
        }
        else {
            email(__book.Course,"Dear User,\n New Textbook available for your course.Check it out","New Book");
            res.send({
                message: "Book Inserted Succesfully",
                flag:true
            });
            return  ;
        }
    });
    
}

getbooks = function(req,res,next){
   //console.log("Sad");
    textbook.find({},function(err,rs){
        //console.log(rs);
        if(err || rs==null){
            res.json({
                message:"No Such Record Found",
                flag:false
            })
        }
        else{
            //console.log(rs.Name);

            //console.log("retrived")
            res.json({records:rs,flag:true});
            //res.send(rs)
        }
    });   
}

deleteBook =function(req,res,next)
{
    textbook.deleteOne({Name:req.body.Name},function(err){
        if(err){
            res.json({flag:false});
        }
        else{
            res.json({flag:true});
        }
    });
}

module.exports = function (router) {
    router.post('/uploadBook', createtextbook);
    router.post('/getEveryBooks',getbooks);
    router.post('/deleteBookByName',deleteBook);
}