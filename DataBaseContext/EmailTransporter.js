var nd = require('nodemailer');
var transporter = nd.createTransport({
    service:'gmail',
    auth:{
        user:'shareedu7896@gmail.com',
        pass:'shareedu123'
    }
});

var UserCategory = require("./UserCategory/UserCategory.models");

module.exports = function (course,message,subject) { 
    UserCategory.find({category:course},function (err,result) {  

        result.forEach(data=>{
            transporter.sendMail({
                from:"shareedu7896@gmail.com",
                to:data.email,
                subject:subject,
                text:message
            });
        });
    });
    
 }