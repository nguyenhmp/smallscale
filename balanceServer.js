var httpProxy = require('http-proxy');
var proxy = httpProxy.createServer();
var http = require('http')
var addresses = [
  {
    host: 'localhost',
    port: 3000
  },
  {
    host: 'localhost',
    port: 3001
  }
];

var balancer = express();
http.createServer(function(req, res){
  var startTime = new Date();
  var target = { target: addresses.shift() };

  //
  // ...then proxy to the server whose 'turn' it is...
  //
  console.log('balancing request to: ', target);
  proxy.web(req, res, target);

  //
  // ...and then the server you just used becomes the last item in the list.
  //
  addresses.push(target.target);
}).listen(8000); 