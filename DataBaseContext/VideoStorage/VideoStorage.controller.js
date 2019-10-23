var VideoStorageModel = require('./VideoStorage');
entryForEmail = function(req,rs,next){
    //console.log("ads");
    VideoStorageModel.insertMany([{name:req.body.name,email:req.body.email}],function(err,docs){
        if(err)
        {
            rs.json({flag:false});
        }
        else{
            rs.json({flag:true});
        }
    });
}
getSeenNameByEmail = function(req,res,next){
    VideoStorageModel.find({email:req.body.email},function(err,results){
        if(err)
        {
            res.json({flag:false});
        }
        else{
            res.json({flag:true,records:results});
        }
    });
}
module.exports = function (router) {
    router.post('/videoSeen', entryForEmail);
    router.post('/getSeenByEmail',getSeenNameByEmail);
}