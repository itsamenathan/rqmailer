var config        = GLOBAL.config;
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function Email(){
  this.transport = nodemailer.createTransport(smtpTransport({
                     host: config.email.host,
                     port: config.email.port,
                       auth: {
                         user: config.email.user,
                         pass: config.email.pass
                       }
                   }));
}

Email.prototype.send = function(to, subject, body){
  this.transport.sendMail({
    from: config.email.from,
    to: config.email.to[to],
    subject: subject,
    text: body
  });
};

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Email();
  }
  return instance;
}());
