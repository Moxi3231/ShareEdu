var Notes = require('./Notes.model');

createNote = function (req, res, next) {
    // console.log(req.body);
    var __note = {
        Name: req.body.name,
        Email: req.body.email
    };
    // console.log(req.body.Name)
    Notes.insertMany([__note], function (err, std) {
        if (err) {
            console.log("Some Error Occured: " + err);
            res.json({
                message: err,
                flag: true
            });
            return;
        }
        else {
            res.send({
                message: "Note Created Succesfully",
                flag: true
            });
            return;
        }
    });

}

getNoteByEmail = function (req, res, next) {
    //console.log("Sad");
    Notes.find({ Email: req.body.email }, function (err, rs) {
        //console.log(rs);
        if (err || rs == null) {
            res.json({
                message: "No Such Record Found",
                flag: false
            });
        }
        else {
            //console.log(rs.Name);
            //console.log("retrived")
            res.json({ records: rs, flag: true });
            //res.send(rs)
        }
    });
}

saveNote = function (req, res, next) {
    var __note = {
        Name: req.body.name,
        Email: req.body.email
    };
    Notes.updateOne(__note, { Content: req.body.content }, function (err, data) {
        if (err) {
            res.json({ message: "Some error occured", flag: false });
        }
        else {
            res.json({ message: "Record Saved", flag: true });
        }
    });
}

deleteNote = function (req, res, next) {
    Notes.deleteOne({ Name: req.body.name, Email: req.body.email }, function (err) {
        if (err) {
            res.json({ flag: false });
        }
        else {
            res.json({ flag: true });
        }
    });
}

module.exports = function (router) {
    router.post('/createNote', createNote);
    router.post('/getNoteByEmail', getNoteByEmail);
    router.post('/deleteNote', deleteNote);
    router.post('/updateNote', saveNote);
}