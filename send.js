var sys = require("sys");
var stdin = process.openStdin();
var config = require( './config.js' );
var cradle = require('cradle');

var couch = new(cradle.Connection)(config.couch.url, config.couch.port).database(config.couch.db);

stdin.addListener("data", function(d) {
    msg = d.toString().substring(0, d.length-1);
    publishMessage(msg);
});


function publishMessage(message){
  couch.save({stdin: message},function (err, res) {
    console.log("error: "+err);
    console.log("res: "+res);
  });
}

