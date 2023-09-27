var mysqlConnect = require("../mysql/connect");
var _ = require('lodash');
var data = require("../data");
var spool = null;
var config = require("../config");
function execMysql(query, callback) {
    connection = mysqlConnect.getDbConnection();
    connection.connect(function (err) {
        if (err) {
            callback(err, null)
        } else {
            connection.query(query, function (err, rows, fields) {
                callback(err, rows, fields);
            });
        }

    })
}
module.exports = {
    _msTaskGet: function (data, callback) {
        var query = "SELECT * FROM tasks Order by id desc Limit " + data.page + "," + config.page;
        execMysql(query, function (err, rows, fields) {
            callback(err, rows);
        });
    },
    _msTaskGetMetrice: function (callback) {
        var query = `SELECT
                    DATE_FORMAT(date, '%Y-%m') AS task_date,
                    status,
                    COUNT(*) AS task_count
                    FROM
                    tasks
                    GROUP BY
                    task_date,
                    status
                    ORDER BY task_date DESC,status;`
        execMysql(query, function (err, rows, fields) {
            callback(err, rows);
        });
    },
    _msGetTask: function (id, callback) {
        var query = `SELECT * from tasks where id=` + id;
        execMysql(query, function (err, rows, fields) {
            callback(err, rows);
        });
    }

};

