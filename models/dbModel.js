var dbpool = require("../server/dbConfig.js")
module.exports = (function(){
	return {
		select:function(callback){
      var selectQuery = 'SELECT * FROM businesses LIMIT 10';
      dbpool.getConnection(function(err, connection){
        if(err){
          console.log(err)
        } else {
          connection.query(selectQuery, function(err, results){
            if(err){
              console.log(err)
              connection.release();
            } else {
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
              callback(null, results)
            }
          })
        }
      })
    },
    topBusinessInCountry: function(callback){
      var getTopBusinessInCountryQuery = "SELECT bi.annual_profit, a.country, b.business_name " + 
                                         "FROM businesses AS b " +
                                         "JOIN business_infos AS bi ON bi.business_id = b.id " + 
                                         "JOIN addresses AS a ON b.id = a.business_id " +
                                         "GROUP BY a.country "+
                                         "ORDER BY a.country, annual_profit desc " +
                                         "LIMIT 300";
                                         console.log(getTopBusinessInCountryQuery)
      dbpool.getConnection(function(err, connection){
        if(err) return console.log(err);
        connection.query(getTopBusinessInCountryQuery, function(err, results){
          if(err){
            console.log(err)
            connection.release();
          } else {
            connection.release();
            callback(null, results)
          }
        })
      })
    }
	}
})()