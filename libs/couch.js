var config  = GLOBAL.config;

function Couch(){
  var couch = require('nano')(
      {
        "url"      : config.couch.url,
        "parseUrl" : false
      });
  var db = couch.db.use('rqmailer');
  return db;
}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Couch();
  }
  return instance;
}());
