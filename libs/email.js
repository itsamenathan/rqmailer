var log           = require('logule').init(module, 'email');
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// return constructor
module.exports = Email;

function Email(cfg){
  this.transport = nodemailer.createTransport(smtpTransport({
                     host: cfg.host,
                     port: cfg.port,
                       auth: {
                         user: cfg.user,
                         pass: cfg.pass
                       }
                   }));
}

Email.prototype.send = function(from, to, subject, body){
  this.transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: body
  },function(error, response){
    if ( error ){
      log.error("%s",error);
    }
    else{
      log.info("Message sent: %s",response.response);
    }});
};
