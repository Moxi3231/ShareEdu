var mon = require('mongoose');
var schema = mon.Schema;
var UserCategorySchema = new schema({
    email:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

var UserCategoryModel = mon.model('User_Category',UserCategorySchema);
module.exports = UserCategoryModel;
