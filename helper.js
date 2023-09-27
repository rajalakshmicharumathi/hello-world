var _ = require('lodash');
var async = require('async');
var data = require("./data");
module.exports = {
    //error message
    _errorResponse: function (err, extra = null) {
        var json = {};
        json[data.responsekey.status_code] = data.statusCode.failure;
        json[data.responsekey.statusKey] = data.statusKey.failure;
        json[data.responsekey.status_msg] = err;
        if (extra) {
            json[extra.key] = extra.value;
        }
        return json;
    },
    //success message
    _successResponse: function (err, extra = null) {
        var json = {};
        json[data.responsekey.status_code] = data.statusCode.success;
        json[data.responsekey.statusKey] = data.statusKey.success;
        json[data.responsekey.status_msg] = err;
        if (extra) {
            json[extra.key] = extra.value;
        }
        return json;
    },
    _extraParamJson: function (key, value) {
        var extraParam = {
            "key": key,
            "value": value
        }
        return extraParam;
    }

}