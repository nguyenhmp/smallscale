<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

</body>
<script type="text/javascript">
// 00000000000111 10101010111100
var t1 = inputs[0];
var t2 = inputs[1];
// - 2 123
// Output
// 9 (12 - 3)
	function maxDenominator(input1, input2){
		var date1 = new Date("December 17, 1995 " + input1);
		var date2 = new Date("December 17, 1995 " + input2);
		date1 = date1.getMilliseconds();
		date2 = date2.getMilliseconds();
		var date3 = Math.abs(date1 - date2);
		var dateFinal = new Date(date3);
		console.log(date3)
	}
	console.log(maxDenominator("-", 123, 2))
</script>
</html>


balancer.use('/', function(req, res){
  var url = "http://localhost:3000" + req.url;
  req.pipe(request(url)).pipe(res);
})

balancer.listen(8000, '0.0.0.0', function(req, res){
  console.log("balancer listening on 8000")
})

app.get('/images/:id', function(req, res){
	console.log('here')
	sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
  });
})


var fetch = require('node-fetch');
var FormData = require('form-data');
var form = new FormData();
form.append('a', 1);
console.log(form)
    	console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    	console.log(form.getHeaders())
fetch('http://httpbin.org/post', { method: 'POST', body:{ args:{ name:'steve',steven:'chu'}}, headers:{'Content-Type': 'application/json'} })
    .then(function(res) {
    	console.log(res)
    	// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    	// console.log(res.headers._headers)
    	//.Headers['_headers']['content-type']
        return res.json();
    }).then(function(json) {
    	console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        console.log(json);
    });

//     $.get( "http://localhost:3000", function( data ) {
//   $( "#thousandOrdered" ).html( data );
// });

  request(url, function(error, response, body){
    zlib.deflate(body, (err, buffer) => {
      res.writeHead(200, { 'content-encoding': 'deflate'});
      res.pipe(buffer)
    })
  })

    // request(url, (error, response, body) => {
    console.log(body)
    zlib.deflate(body, (err, buffer) => {
      res.writeHead(200, { 'content-encoding': 'deflate'});
      req.pipe(buffer).pipe(res)
      zlib.deflate(request(url), (err, buffer) => {
        res.writeHead(200, { 'content-encoding': 'deflate'});
      buffer.pipe(res)
      })
    })
  })

  var proxy = http.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
  // res.redirect('http://localhost:3001/');
  request('http://localhost:3000/', function(error, response, body){
    // console.log(response)
    // res.pipe(body)
  })