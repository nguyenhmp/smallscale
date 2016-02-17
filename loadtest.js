var mysql = require('mysql')
var express = require('express');
var async = require('async');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());

app.listen(8889, function(req, res){
  console.log("listening on 8889")
})

app.get('/', function(req, res){
	res.render('loadtest')
	// request('http://webserver1.com:3000/', function (error, response, body) {
	// 	// console.log(response)
	// 	console.log(response.toJSON())
	// 	console.log(error)
	// 	if (!error && response.statusCode == 200) {
	// 		res.send(body)
	// 	}
	// })
})