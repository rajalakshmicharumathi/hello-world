var config = require("../config");
var helper = require("../helper");
var data = require("../data");
var getMysql = require("../mysql/get");
var async = require("async");

var task = {
    /**
     * get Task
     */
    _processGet: function (req, callback) {
        async.waterfall([
            function (callback) { //validate the input param
                const { page } = req;
                if (!page) {
                    callback(helper._errorResponse(data.errorMsg.required_error), null);
                }
                else {
                    callback(null, req);
                }
            },
            function (req, callback) { // Get task details
                const offset = (req.page - 1) * config.page;
                req.page = offset;
                getMysql._msTaskGet(req, function (err, Resp) {
                    if (err)
                        callback(helper._errorResponse(data.errorMsg.something_went_wrong_query, helper._extraParamJson("error", err)), Resp);
                    else
                        callback(null, Resp);
                })
            },
            function (row, callback) {//Final json response formation
                var Getfields = row;
                callback(null, helper._successResponse(data.successMsg.get_task, helper._extraParamJson("TasksDetails", Getfields)));
            }
        ], function (err, result) { // Finally return the output in api end point
            if (err) {
                callback(err);
            } else {
                callback(result);
            }

        })
    },

    /**
 * get Metrices
 */
    _processGetMetrices: function (req, callback) {
        async.waterfall([
            function (callback) { // Get metrices details
                getMysql._msTaskGetMetrice(function (err, Resp) {
                    if (err)
                        callback(helper._errorResponse(data.errorMsg.something_went_wrong_query, helper._extraParamJson("error", err)), Resp);
                    else
                        callback(null, Resp);
                })
            },
            function (row, callback) {//Final json response formation
                task._jsonFormat(row, function (err, resp) {
                    var Getfields = resp;
                    if (err)
                        callback(helper._errorResponse(err), helper._successResponse(data.successMsg.get_task, helper._extraParamJson("TasksDetails", Getfields)));
                    else
                        callback(null, helper._successResponse(data.successMsg.get_task, helper._extraParamJson("TasksDetails", Getfields)));
                })

            }
        ], function (err, result) { // Finally return the output in api end point
            if (err) {
                callback(err);
            } else {
                callback(result);
            }

        })
    },

    /**
     * Format response based on json
     * 
     */

    _jsonFormat: function (taskData, callback) {
        try {
            const inputJson = taskData;

            const outputData = {};

            inputJson.forEach((item) => {
                const [year, month] = item.task_date.split('-');
                const monthYear = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

                if (!outputData[monthYear]) {
                    outputData[monthYear] = {
                        date: monthYear,
                        metrics: {
                            "open": 0,
                            "in-progress": 0,
                            "completed": 0,
                        },
                    };
                }

                outputData[monthYear].metrics[`${item.status}`] += item.task_count;
            });

            const outputArray = Object.values(outputData);
            callback(null, outputArray);
        } catch (e) {
            callback(e, null);
        }

    }
}

/*Function to get the list of task based on pagination*/
exports.getTask = function (req, callback) {
    try {
        task._processGet(req, function (response) {
            callback(response);
        })
    } catch (e) {
        callback(helper._errorResponse(e));
    }

}

/*Function to get metrices data*/
exports.metrics = function (req, callback) {
    try {
        task._processGetMetrices(req, function (response) {
            callback(response);
        })
    } catch (e) {
        callback(helper._errorResponse(e));
    }
}

