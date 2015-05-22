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
    var isValid = validateData(doc);
    if ( isValid === true ) {
      log.info("Sending email - [to: %s]",doc.data.to);
      email.send(doc.data.to, doc.data.subject, doc.data.body);
    }
    else {
      log.error("%s",isValid);
    }
  });
});

feed.follow();

function validateData(doc){
  if ( doc.sender == config.rq.sender ) return 'Sender is me';
  if (typeof config.email.to[doc.data.to] == 'undefined' ) return 'To not valid';
  if (typeof doc.data.subject == 'undefined' ) return 'Subject not valid';
  if (typeof doc.data.body == 'undefined' ) return 'Body not valid';
  return true;
}
