var Video = require('./Video.models');

uploadPath = function (req, res, next) {
    var __video = {
        name: req.body.name,
        path: req.body.path,
        description: req.body.description,
        category:req.body.category
    };
    //console.log(req.body);
    //console.log(__video);
    Video.insertMany([__video], function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err
            });
            return;
        }
        else {
            res.send({
                message: "Video Uploaded Succesfully"
            });
            return  ;
        }
    });
    
}

getPaths = function(req,res,next){
    Video.find({},function(err,rs){
        if(err){
            res.json({
                message:err
            })
        }
        else{
            res.send(rs);
        }
    });   
}

getPathByCategory =function(req,res,next){
    Video.find({category:req.body.category},function(err,rs){
        if(err || rs==[]){
            res.json({
                message:"Record not found",
                flag:false
            });
        }
        else{
            res.json({record:rs,
            flag:true});
        }
    });
}

deletePathByName = function (req,res,next) { 
    Video.deleteOne({name:req.body.name},function (err) { 
        if(err)
        {
            res.json({
                message:"No record found",
                flag:false
            });
        }
        else{
            res.json({
                message:"Deleted succesfully",
                flag:true
            });
        }
     });
 }
module.exports = function (router) {
    router.post('/uploadPath', uploadPath);
    router.post('/getPaths',getPaths);
    router.post('/getPathByCategory',getPathByCategory);
    router.post('/deletePathByName',deletePathByName);
}