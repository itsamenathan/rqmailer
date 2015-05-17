var cradle = require('cradle');

var config  = GLOBAL.config;

function Couch(){
  var db = new(cradle.Connection)(config.couch.url, config.couch.port).database(config.couch.db);
  return db;
}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Couch();
  }
  return instance;
}());
