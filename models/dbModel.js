var mysql = require('mysql');
var dbpool = require("../server/dbConfig.js")
module.exports = (function(){
	return {
		select:function(callback){
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
    }
	}
	function getTopBusiness (count, array, countries, callback){
	  if (count == countries.length-1){
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
	  dbpool.getConnection(function(err, connection){
	    if(err) return console.log(err);
	    connection.query(getTopBusinessInCountry, function(err, results){
	      if(err){
	        console.log(err)
	        connection.release();
	      } else {
	        array.push(results[0]);
	        count++;
	        connection.release();
	        getTopBusiness(count, array, countries, callback)
	      }
	    })
	  })
	}
})()