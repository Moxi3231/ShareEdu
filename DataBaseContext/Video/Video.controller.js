var Video = require('./Video.models');

uploadPath = function (req, res, next) {
    var __video = {
        name: req.body.name,
        path: req.body.path,
        description: req.body.description,
        category:req.body.category
    };
    //console.log(__user);
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


module.exports = function (router) {
    router.post('/uploadPath', uploadPath);
    router.post('/getPaths',getPaths);
}