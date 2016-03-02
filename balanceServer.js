// var httpProxy = require('http-proxy');

var AWS = require('aws-sdk');
// var proxy = httpProxy.createServer();
// var http = require('http')
// var addresses = [
//   {
//     host: 'http://ec2-52-37-120-158.us-west-2.compute.amazonaws.com/',
//     port: 3000
//   },
//   {
//     host: 'http://ec2-52-37-3-211.us-west-2.compute.amazonaws.com/',
//     port: 3000
//   }
// ];
var ec2 = new AWS.EC2({region: 'us-west-2'});
var params = {
  ImageId: 'ami-9abea4fb', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't2.micro',
  MinCount: 1,
  MaxCount: 1,
  SecurityGroups: ['launch-wizard-1'],
  KeyName: 'scaleapp1'
};

ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);
});

// http.createServer(function(req, res){
//   var startTime = new Date();
//   var target = { target: addresses.shift() };
//   // ...then proxy to the server whose 'turn' it is...
//   console.log('balancing request to: ', target);
//   proxy.web(req, res, target);
//   // ...and then the server you just used becomes the last item in the list.
//   addresses.push(target.target);
// }).listen(8000); 

