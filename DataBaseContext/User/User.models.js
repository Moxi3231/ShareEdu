var mon = require('mongoose');
var schema = mon.Schema;
var UserSchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:30
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        maxlength:30,
        minlength:7
    },
    isAdmin:{
        type:Boolean,
        required:false
    }
});

var UserModel = mon.model('User',UserSchema);
module.exports = UserModel;
