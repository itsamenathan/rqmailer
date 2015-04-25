var server     = require('./server.js');

server.post('/', request);

function request(req, res, next){
  //console.log(req.headers);
  console.log(req.params);

  if (!checkData(req)){
    res.send(404);
    return next();
  }
  res.send(200);
  return next();
}

function checkData(req){
  var data = req.params.data;
  if (typeof data.subject == 'undefined' ) return false;
  if (typeof data.body == 'undefined' ) return false;
  return true;
}
