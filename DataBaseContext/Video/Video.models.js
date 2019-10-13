var mon = require('mongoose');
var schema = mon.Schema;
var VideoSchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        unique:true
    },
    path:{
        unique:true,
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        maxlength:700,
        minlength:7
    },
    category:{
        type:String,
        required:true,
        maxlength:30
    }
});

var VideoModel = mon.model('Videos',VideoSchema);
module.exports = VideoModel;
