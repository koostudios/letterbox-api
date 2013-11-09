/**
 * letterbox v0.0.1
 */

// Variables
var package = require('./package.json'),
    restify = require('restify'),
    app = restify.createServer({
      name: package.name,
      version: package.version
    }),
    config = require('./config.json'),
    cradle = require('cradle'),
    db = new (cradle.Connection)(config.db.url, config.db.port, {
      auth: config.db.auth,
      cache: true,
      raw: false
    }).database(config.db.database);

// Configuration
app.use(restify.bodyParser({mapParams:false}));
app.use(restify.queryParser({mapParams:false}));

// Routes
app.get('/', function(req, res) {
  res.send(200, {welcome: package.name, version: package.version});
  return next();
});

app.post('/:user/:letterbox', function(req, res) {
  var data = {
    letterbox: req.params.user + '/' + req.params.letterbox,
    user: req.params.user,
    data: req.body
  }
  
  db.save(data, function(err, doc) {
    if (err) {
      res.send(401, err);
      return next();
    }

    res.send(200, doc);
    return next();
  });
});

// Serve static files
app.get(/\/?.*/, restify.serveStatic({
  directory: './public'
}));

// Start application
app.listen(config.port);
