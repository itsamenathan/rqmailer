var restify      = require('restify');
var config       = GLOBAL.config;

function Server(){
  var server = restify.createServer();
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());


  server.listen(config.server.port, '');
  return server;
}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Server();
  }
  return instance;
}());
