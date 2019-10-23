var mon = require('mongoose');
var schema = mon.Schema;
var VideoStorageSchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:30
    },
    email:{
        type:String,
        required:true
    }
});

var VideoStorageModel = mon.model('VideoStorageCollection',VideoStorageSchema);
module.exports = VideoStorageModel;
