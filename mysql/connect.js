var mysql = require('mysql');
var config = require("../config")
/**
 * 
 *  Make a common connection
 */
exports.getDbConnection = function () {
  try {
    var con = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
    });
    return con;
  } catch (e) {
    throw Error(e)
  }



}
