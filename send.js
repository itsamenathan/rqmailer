var sys = require("sys");
var stdin = process.openStdin();
var amqp = require('amqp');
var config = require( './config.js' );

var rabbit = amqp.createConnection(config.rabbit);

stdin.addListener("data", function(d) {
    msg = d.toString().substring(0, d.length-1);
    publishMessage(msg);
});


function publishMessage(message){
  rabbit.exchange('redqueen', {}, function (exchange){
    exchange.publish('rqmailer', message, {}, function(d){
      console.log("publish error: "+d);
    });
  });
}

