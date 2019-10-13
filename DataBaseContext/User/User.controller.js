var User = require('./User.models');

createUser = function (req, res, next) {
    var __user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    //console.log(__user);
    User.insertMany([__user], function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err
            });
            return;
        }
        else {
            res.send({
                message: "User Inserted Succesfully"
            });
            return  ;
        }
    });
    
}

getUser = function(req,res,next){
    var __user = {
        email: req.body.email,
        password: req.body.password
    };
   
    User.findOne(__user,function(err,rs){
        if(err || rs==null){
            res.json({
                message:"No Such Record Found",
                flag:false
            })
        }
        else{
            res.json({
                message:"Record Retrieved",
                flag:true,
                name:rs.name
            });
        }
    });   
}


module.exports = function (router) {
    router.post('/create', createUser);
    router.post('/getUser',getUser);
}