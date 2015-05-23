var config        = GLOBAL.config;
var log           = require('logule').init(module, 'email');
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
  },function(error, response){
    if ( error ){
      log.error(error);
    }
    else{
      log.info("Message sent: %s",response.response);
    }});
};

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Email();
  }
  return instance;
}());
