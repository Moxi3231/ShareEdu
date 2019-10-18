var mon = require('mongoose');
var schema = mon.Schema;
var notesSchema = new schema({
    Email:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
        },
    Content:{
        type:String,
            }
});

var notesModel = mon.model('Notes',notesSchema);
module.exports = notesModel;