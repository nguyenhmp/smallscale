var mysql = require('mysql');
module.exports = (function(){
	return dbpool = mysql.createPool({
	  "connectionLimit": 100, 
	  // "host": "scapeappdb.czk3w9kdv9on.us-west-2.rds.amazonaws.com",
	  "host": "localhost",
	  "database": "scalingdb",
	  "user": "root",
	  "password": "root",
	  "port": 3306
	});
})()