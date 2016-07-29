var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
  service: "Gmail",
  auth: {
        user: 'volunteerhubco@gmail.com',
        pass: process.env.emailPass
  }
}));

module.exports = function(mailOptions){
  mailOptions.from = 'VolunteerHub <volunteerhubco@gmail.com>';
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
    }else{
    console.log('Message sent: ' + info.response);
    }
  });
};




