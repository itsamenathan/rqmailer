var nano = require('nano');
var log = require('logule').init(module, 'couch');

function Couch(cfg) {
  var couch = nano({
    'url'      : cfg.url,
    'parseUrl' : false
  });

  this.db    = couch.db.use(cfg.db);

  this.feed  = this.db.follow({
    since        : 'now',
    include_docs : true,
    filter       : 'project/by_name',
    query_params : {name : cfg.filter}
  });
}

// return constructor
module.exports = Couch;


