var fetch = require('node-fetch');
var FormData = require('form-data');
var form = new FormData();
form.append('a', 1);
// console.log(form)
//     	console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
//     	console.log(form.getHeaders())
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
  //   console.log(body)
  //   // zlib.deflate(body, (err, buffer) => {
  //   //   // res.writeHead(200, { 'content-encoding': 'deflate'});
  //   //   // req.pipe(buffer).pipe(res)
  //   //   // zlib.deflate(request(url), (err, buffer) => {
  //   //     // res.writeHead(200, { 'content-encoding': 'deflate'});
  //   //   // buffer.pipe(res)
  //   //   // })
  //   // })
  // })

//   // var proxy = http.createClient(80, request.headers['host'])
//   // var proxy_request = proxy.request(request.method, request.url, request.headers);
//   // proxy_request.addListener('response', function (proxy_response) {
//   //   proxy_response.addListener('data', function(chunk) {
//   //     response.write(chunk, 'binary');
//   //   });
//   //   proxy_response.addListener('end', function() {
//   //     response.end();
//   //   });
//   //   response.writeHead(proxy_response.statusCode, proxy_response.headers);
//   // });
//   // request.addListener('data', function(chunk) {
//   //   proxy_request.write(chunk, 'binary');
//   // });
//   // request.addListener('end', function() {
//   //   proxy_request.end();
//   // });
//   // // res.redirect('http://localhost:3001/');
//   // request('http://localhost:3000/', function(error, response, body){
//   //   // console.log(response)
//   //   // res.pipe(body)
//   // })