var config  = GLOBAL.config;
var email  = require('./email.js');
var couch  = require('./couch.js');

var feed = couch.changes();
feed.since = 'now';
feed.on('change', function (change) {
  console.log(change);
  couch.get(change.id, function (err, doc) {
    console.log(doc);
  });
});

//rabbit.handle("test.message", function( msg ) {
//  console.log("wabbit: "+msg.body);
//  if (!valData(params)){
//    res.send(404);
//    return next();
//  }
//  //email.send(params.data.to, params.data.subject, params.data.body);
//  msg.ack();
//});

function valData(params){
  if (typeof config.email.to[params.data.to] == 'undefined' ) return false;
  if (typeof params.data.subject == 'undefined' ) return false;
  if (typeof params.data.body == 'undefined' ) return false;
  return true;
}
