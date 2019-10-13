var mon = require('mongoose');
var schema = mon.Schema;
var CategorySchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:2
    }
});

var UserModel = mon.model('User',UserSchema);
module.exports = UserModel;
