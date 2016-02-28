var mysql = require('mysql');
var _ = require('underscore')
var express = require('express'); 
var async = require('async');
var server = express()
var bodyParser = require('body-parser');
var randy = require('randy');
var faker = require('faker');
var gzippo = require('gzippo');
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');
var request = require('request');
var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

var dbpool = mysql.createPool({
  "connectionLimit": 100, 
  "host": "scapeappdb.czk3w9kdv9on.us-west-2.rds.amazonaws.com",
  "database": "scaledb2",
  "user": "root",
  "password": "rootroot",
  "port": 3306
});

server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json());
// server.use(express.static(__dirname + '/public'))
server.use(gzippo.staticGzip(__dirname + '/public'));
server.use(gzippo.compress());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', function(req, res, next){
  var startTime = new Date();
  startTime = startTime.getTime();
  async.parallel({
    select: function(callback){
      var selectQuery = 'SELECT * FROM businesses LIMIT 100';
      dbpool.getConnection(function(err, connection){
        if(err){
          console.log(err)
        } else {
          connection.query(selectQuery, function(err, results){
            if(err){
              console.log(err)
              connection.release();
            } else {
              for(var i = 0; i < results.length; i++) {
                for(var j = 0; j < results.length; j++) {
                  for(var k = 0; k < results.length; k++) {
                    if ( results[j].business_name < results[k].business_name ) {
                      var temp = results[k];
                      results[k] = results[j];
                      results[j] = temp;
                    }
                    if ( results[i].business_name < results[k].business_name ) {
                      var temp = results[k];
                      results[k] = results[i];
                      results[i] = temp;
                    }
                  }
                }
              }
              callback(null, results)
            }
          })
        }
      })
    },
    topBusinessInCountry: function(callback){
      var getCountryQuery = 'SELECT country FROM addresses GROUP BY country';
      var topBusinessInCountry = [];
      dbpool.getConnection(function(err, connection){
        if(err) return console.log(err);
        connection.query(getCountryQuery, function(err, results){
          if(err){
            console.log(err)
            connection.release();
          } else {
            // console.log(results)
            connection.release();
            var topCountryBusiness = [];
            getTopBusiness (0, topCountryBusiness, results, function(array){
              callback(null, array)
            })
          }
        })
      })
    },
  },
  function(err, results) {
    // res.set('X-Response-Time', '300')
    var endTime = new Date();
    var timeResults = endTime - startTime
    console.log("time take to do reqeuest,", timeResults)
    res.status(200).render('index', results)
    // server.render('index', results, function(err, html){
    //   res.send(html)        
    // });
  });
})

server.listen((3000), function(req, res){
  console.log("listening on " + (3000))
})


function getTopBusiness (count, array, countries, callback){
  // console.log(countries)
  console.log(count)
  if (count == countries.count-1){
    callback(array)
    return;
  }
  var getTopBusinessInCountry = "SELECT bi.annual_profit, a.country, b.business_name " +
                                 "FROM businesses AS b " + 
                                 "JOIN business_infos AS bi ON bi.business_id = b.id " + 
                                 "JOIN addresses AS a ON b.id = a.business_id " +
                                 "WHERE a.country = " + dbpool.escape(countries[count]["country"]) +
                                 "ORDER BY annual_profit desc " +
                                 "LIMIT 1";
  console.log(getTopBusinessInCountry)                                
  dbpool.getConnection(function(err, connection){
    if(err) return console.log(err);
    connection.query(getTopBusinessInCountry, function(err, results){
      if(err){
        console.log(err)
        connection.release();
      } else {
        console.log(results[0]);
        array.push(results[0]);
        count++;
        connection.release();
        getTopBusiness(count, array, countries, callback)
      }
    })
  })
}