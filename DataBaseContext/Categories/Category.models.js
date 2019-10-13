var mon = require('mongoose');
var schema = mon.Schema;
var CategorySchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:2,
        unique:true
    }
});

var CategoryModel = mon.model('Category',CategorySchema);
module.exports = CategoryModel;
