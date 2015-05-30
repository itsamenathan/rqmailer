var config  = GLOBAL.config;
var log     = require('logule').init(module, 'rqmailer');
var email   = require('./email.js');
var db      = require('./couch.js');

function validateData(doc){
  // Check if sender of message is also receaver
  if ( doc.sender === config.rq.sender ) { throw 'Sender is me'; }

  // Check that subject is defined
  if ( doc.data.to === 'undefined' ) { throw 'To not valid'; }

  // Chck the whitelist
  if ( config.email.to.indexOf(doc.data.to ) === -1) { throw "Email not in whitelist"; }

  // Check that subject is defined
  if ( doc.data.subject === 'undefined' ) { throw 'Subject not valid'; }

  // Check if subject contains something
  if ( ! doc.data.subject ) { throw 'Subject not valid'; }

  // Check if Body is defined
  if ( doc.data.body === 'undefined' ) { throw 'Body not valid'; }

  // Check if Body contains something
  if ( ! doc.data.body ) { throw 'Body not valid'; }

  return true;
}
// follow db changes starting from now
var feed = db.follow({ since: 'now' });
feed.on('change', function (change) {
  // received doc change, now get doc
  db.get(change.id, function (err, doc) {
    if ( err ) { log.err("%j", err); return; }
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
