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