var server = require('./server.js');
var email  = require('./email.js');

server.post('/', request);

function request(req, res, next){
  //console.log(req.headers);
  var params = req.params;

  if (!checkData(params)){
    res.send(404);
    return next();
  }
  email.send('nathan@frcv.net', params.data.subject, params.data.body);
  res.send(200);
  return next();
}

function checkData(params){
  if (typeof params.data.subject == 'undefined' ) return false;
  if (typeof params.data.body == 'undefined' ) return false;
  return true;
}
