var httpProxy = require('http-proxy');
var proxy = httpProxy.createServer();
var http = require('http')
var addresses = [
  {
    host: 'http://ec2-52-37-120-158.us-west-2.compute.amazonaws.com/',
    port: 3000
  },
  {
    host: 'http://ec2-52-37-3-211.us-west-2.compute.amazonaws.com/',
    port: 3000
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