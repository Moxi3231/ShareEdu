var UserCategory = require('./UserCategory.models');

createUserCategory = function (req, res, next) {
    var __ucategory = {
        email:req.body.email,
        category:req.body.category
    };
    //console.log(__user);
    UserCategory.insertMany([__ucategory], function (err, std) {
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
                message: "Category Inserted Succesfully",
                flag:true
            });
            return  ;
        }
    });
    
}

getUserCategories = function(req,res,next){
    UserCategory.find({email:req.body.email},function(err,rs){
        //console.log(rs);
        if(err){
            res.json({
                message: err
            });
            return;
        }
        else{
            res.send(rs);   
        }
    });   
}

deleteUserCategory = function(req,res,next){
    var __ucategory = {
        email:req.body.email,
        category:req.body.category
    };
    UserCategory.deleteMany(__ucategory,function(err,rs){
        if(err)
        {
            res.json({message:err});
            console.error(err);
        }
        else
        {
            res.json({message:"Successfully Deleted"});
        }
    });
}
checkUserCategory = function(req,res,next){
    var __ucategory = {
        email:req.body.email,
        category:req.body.category
    };
    UserCategory.findOne(__ucategory,function(err,rs){
        if(err || rs==null)
        {
            res.json({message:"No Record Found",flag:false});
            console.error(err);
            return;
        }
        else
        {
            res.json({message:"Found",flag:true});
            return;
        }
    });
}
module.exports = function (router) {
    router.post('/cUserCategory', createUserCategory);
    router.post('/getUserCategories',getUserCategories);
    router.post('/deleteUserCategory',deleteUserCategory);
    router.post('/checkUserCategory',checkUserCategory);
}