var config = require("../config");
var helper = require("../helper");
var data = require("../data");
var setMysql = require("../mysql/set");
var async = require("async");

var task = {
    /**
     * Create Task
     */
    _processCreate: function (req, callback) {
        async.waterfall([
            function (callback) { //validate the input param
                const { task_name, task_description, date, status } = req;
                const enumValues = ["open", "in-progress", "completed"];
                var statusValid = enumValues.includes(req.status);
                if (!task_name || !task_description || !date || !status) {
                    callback(helper._errorResponse(data.errorMsg.required_error), null);
                } else if (statusValid != true) {
                    callback(helper._errorResponse(data.errorMsg.invalid_status), null);
                }
                else {
                    callback(null, req);
                }
            },
            function (req, callback) { // Insert task details
                setMysql._msTaskInsert(req, function (err, Resp) {
                    if (err)
                        callback(helper._errorResponse(data.errorMsg.something_went_wrong_query, helper._extraParamJson("error", err)), Resp);
                    else
                        callback(null, Resp);
                })
            },
            function (row, callback) {//Final json response formation
                var taskId = row.insertId ? row.insertId : 0;
                callback(null, helper._successResponse(data.successMsg.task_created, helper._extraParamJson("task_id", taskId)));
            }
        ], function (err, result) { // Finally return the output in api end point
            if (err) {
                callback(err);
            } else {
                callback(result);
            }

        })
    }

}

exports.createTask = function (req, callback) {
    try {
        task._processCreate(req, function (response) {
            callback(response);
        })
    } catch (e) {
        callback(helper._errorResponse(e));
    }

}