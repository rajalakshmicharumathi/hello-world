var mysqlConnect = require("../mysql/connect");
var _ = require('lodash');
var data = require("../data");
var spool = null;
var helper = require("../helper");
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
    _msTaskInsert: function (data, callback) {
        var query = "INSERT INTO tasks (task_name, task_description,date,status) VALUES ('" + data.task_name + "','" + data.task_description + "','" + data.date + "','" + data.status + "')";
        execMysql(query, function (err, rows, fields) {
            callback(err, rows);
        });
    },
    _msTaskUpdate: function (data, callback) {
        var query = "Update tasks set task_name = '" + data.task_name + "',task_description='" + data.task_description + "',date='" + data.date + "',status='" + data.status + "' where id = " + data.task_id;
        execMysql(query, function (err, rows, fields) {
            callback(err, fields);
        });
    }

};

