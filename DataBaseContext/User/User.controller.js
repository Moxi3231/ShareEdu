var User = require('./User.models');

createUser = function (req, res, next) {
    var __user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin:false
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
            //console.log(rs);
            var flag=false;
            if(rs.isAdmin)
                flag=true;
            res.json({
                message:"Record Retrieved",
                flag:true,
                name:rs.name,
                userAdmin:flag
            });
        }
    });   
}

getAllUsers = function(req,res,next){
    User.find({},function(err,rs){
        if(err)
        {
            res.json({message:"no user found",flag:false});
        }
        else{
            res.json({records:rs,flag:true});
        }
        return;
    });
}

updateUser = function(req,res,next){
    var __user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    //console.log(__user);

    User.updateOne({$set:__user}, function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err,
                flag:false
            });
            return;
        }
        else {
            res.send({
                message: "User Updated Succesfully",
                flag:true
            });
            return  ;
        }
    });
}

assignAdmin = function(req,res,next){
    var __user = {
        email: req.body.email,
        isAdmin:true
    };
    //console.log(__user);
    //console.log(__user);
    User.updateOne({email:__user.email},{$set:{isAdmin:true}} ,function (err, std) {
        //console.log(std);
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err,
                flag:false
            });
            return;
        }
        else {
            res.send({
                message: "User Assigned as Succesfully",
                flag:true
            });
            return  ;
        }
    });
}


removeAdmin = function (req,res,next) {
    User.updateOne({email:req.body.email},{$set:{isAdmin:false}},function (err,rs) {  
        if(err)
        {
            res.json({message:"Cannot update",flag:false});
        }
        else
        {
            res.json({message:"Updated Successfully",flag:true});
        }
    });    

}
module.exports = function (router) {
    router.post('/create', createUser);
    router.post('/getUser',getUser);
    router.post('/updateUser',updateUser);
    router.post('/assignAdmin',assignAdmin);
    router.post('/getAllUser',getAllUsers);
    router.post('/removeUserFromAdmin',removeAdmin);
}