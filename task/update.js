var config = require("../config");
var helper = require("../helper");
var data = require("../data");
var setMysql = require("../mysql/set");
var getMysql = require("../mysql/get");
var async = require("async");

var task = {
    /**
     * Update Task
     */
    _processUpdate: function (req, callback) {
        async.waterfall([
            function (callback) { //validate the input param
                const { task_name, task_description, date, status, task_id } = req;
                const enumValues = ["open", "in-progress", "completed"];
                var statusValid = enumValues.includes(req.status);
                if (!task_name || !task_description || !date || !status || !task_id) {
                    callback(helper._errorResponse(data.errorMsg.required_error), null);
                } else if (statusValid != true) {
                    callback(helper._errorResponse(data.errorMsg.invalid_status), null);
                }
                else {
                    getMysql._msGetTask(req.task_id, function (err, rep) {
                        if (rep.length != 0)
                            callback(null, req);
                        else
                            callback(helper._errorResponse(data.errorMsg.invalid_task_id), null);
                    })
                }
            },
            function (req, callback) { // Update task details
                setMysql._msTaskUpdate(req, function (err, Resp) {
                    if (err)
                        callback(helper._errorResponse(data.errorMsg.something_went_wrong_query, helper._extraParamJson("error", err)), Resp);
                    else
                        callback(null, Resp);
                })
            },
            function (row, callback) {//Final json response formation
                var Updatedfields = req;
                callback(null, helper._successResponse(data.successMsg.task_update, helper._extraParamJson("Updatedfields", Updatedfields)));
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

exports.updateTask = function (req, callback) {
    try {
        task._processUpdate(req, function (response) {
            callback(response);
        })
    } catch (e) {
        callback(helper._errorResponse(e));
    }

}