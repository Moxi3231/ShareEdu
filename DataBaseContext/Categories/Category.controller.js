var Category = require('./Category.models');

createCategory = function (req, res, next) {
    var __category = {
        name: req.body.name
    };
    //console.log(__user);
    Category.insertMany([__category], function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err
            });
            return;
        }
        else {
            res.send({
                message: "Category Inserted Succesfully"
            });
            return  ;
        }
    });
    
}

getCategories = function(req,res,next){
    Category.find({},function(err,rs){
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

deleteCategory = function(req,res,next){
    Category.remove({name:req.body.name},function(err,rs){
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
module.exports = function (router) {
    router.post('/cCategory', createCategory);
    router.post('/getCategories',getCategories);
    router.post('/deleteCategory',deleteCategory);
}