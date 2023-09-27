/*
 * Here constant keys and values will be maintained for common purpose
 */
exports.perpage = 10;
exports.responsekey = {
    status_code: 'StatusCode',
    statusKey: 'Status',
    status_msg: 'StatusMsg',
    code: 'code',
    status: 'status',
    message: 'message'
};
exports.statusCode = {
    true: '1',
    false: '0',
    success: 200,
    failure: 400
};
exports.statusKey = {
    success: 'Success',
    failure: 'Failed',
};

exports.errorMsg = {
    required_error: "All fields are required",
    something_went_wrong_query: "Something went wrong in Mysql",
    mysql_connect_error: "Unable to connect mysql",
    invalid_status: "Invalid status it should anyone open,in-progress,completed",
    invalid_task_id: "Invalid task id"
}

exports.successMsg = {
    task_created: "Task Created Successfully",
    get_task: "Task Listed Successfully",
    task_update: "Task Updated successfully"
}


