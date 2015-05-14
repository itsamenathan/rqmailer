var amqp = require('amqp');
var config  = GLOBAL.config;

function Rabbit(){
  var rabbit = amqp.createConnection(config.rabbit);
  rabbit.on('ready', function () {
    console.log("ready");
    rabbit.queue('afasdfadafaf', function (queue) {
      console.log('Queue ' + queue.name + ' is open');
      queue.bind('redqueen', 'rqmailer');
      queue.subscribe(function (message, headers, deliveryInfo, messageObject) {
        console.log('Got a message with routing key ' + deliveryInfo.routingKey);
        console.log(message.data.toString('utf8'));
      });
});


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
