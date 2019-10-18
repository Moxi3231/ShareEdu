var mon = require('mongoose');
var schema = mon.Schema;
var textbookSchema = new schema({
    Name:{
        type:String,
        required:true,
        maxlength:30,unique:true
    },
    Path:{
        type:String,
        unique:true,
        required:true
    },
    Course:{
        type:String,
        required:true,
        maxlength:30
    },
    Description:{
        type:String,
        required:true,
        maxlength:1000
    },
    Author:{
        type:String,
        required:true,
    }
});

var textbookModel = mon.model('textbook',textbookSchema);
module.exports = textbookModel;