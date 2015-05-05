var rabbit = require("wascally");
var config  = GLOBAL.config;

function Rabbit(){
  rabbit.configure(config.rabbit).done(function() {
      console.log("done!");
    });
  return rabbit;
}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Rabbit();
  }
  return instance;
}());
