var config  = GLOBAL.config;
var log     = require('logule').init(module, 'rqmailer');
var email   = require('./email.js');
var db      = require('./couch.js');

// follow db changes starting from now
var feed = db.follow({ since: 'now' });
feed.on('change', function (change) {
  // received doc change, now get doc
  db.get(change.id, function (err, doc) {
    log.info("doc id: %s", doc._id);
    try {
      validateData(doc);
      log.info("Sending email - [to: %s]",doc.data.to);
      email.send(doc.data.to, doc.data.subject, doc.data.body);
    }
    catch (error) {
      log.error("%s",error);
    }
  });
});

feed.on('error', function(er) {
  log.error(er);
});

feed.follow();

function validateData(doc){
  if ( doc.sender == config.rq.sender ) throw 'Sender is me';
  if (typeof config.email.to[doc.data.to] == 'undefined' ) throw 'To not valid';
  if (typeof doc.data.subject == 'undefined' ) throw 'Subject not valid';
  if ( ! doc.data.subject ) throw 'Subject not valid';
  if (typeof doc.data.body == 'undefined' ) throw 'Body not valid';
  if ( ! doc.data.body ) throw 'Body not valid';
  return true;
}
