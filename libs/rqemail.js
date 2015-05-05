var config  = GLOBAL.config;
var server = require('./server.js');
var email  = require('./email.js');
var rabbit  = require('./rabbit.js');

server.post('/', request);

function request(req, res, next){
  var params = req.params;

  if (!valData(params)){
    res.send(404);
    return next();
  }
  email.send(params.data.to, params.data.subject, params.data.body);
  res.send(200);
  return next();
}

rabbit.handle("test.message", function( msg ) {
  console.log("wabbit: "+msg.body);
  if (!valData(params)){
    res.send(404);
    return next();
  }
  email.send(params.data.to, params.data.subject, params.data.body);
  msg.ack();
});



function valData(params){
  if (typeof config.email.to[params.data.to] == 'undefined' ) return false;
  if (typeof params.data.subject == 'undefined' ) return false;
  if (typeof params.data.body == 'undefined' ) return false;
  return true;
}
