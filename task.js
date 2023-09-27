var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require("./config");
var createTask = require("./task/create");
var updateTask = require("./task/update");
var getTask = require("./task/get");
// process.on('uncaughtException', function (err) {
//     console.error(new Error(err));
// })


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api', function (req, res) {
    // my.getDbConnection();
    res.send('Hello! This is Task related micro-service');
});

//create a task
app.post('/tasks', (req, res) => {
    const task = req.body;
    createTask.createTask(task, function (ticketResp) {
        res.send(ticketResp);
    })
});

//update a task
app.put('/tasks', (req, res) => {
    const task = req.body;
    updateTask.updateTask(task, function (ticketResp) {
        res.send(ticketResp);
    })
});

//get a task
app.get('/tasks', (req, res) => {
    const task = req.query;
    console.log(task);
    getTask.getTask(task, function (ticketResp) {
        res.send(ticketResp);
    })
});

//get a task metrices
app.get('/tasks-metrices', (req, res) => {
    const task = req.query;
    console.log(task);
    getTask.metrics(task, function (ticketResp) {
        res.send(ticketResp);
    })
});

/* General Error Handling thrown from specified router */
app.use(function (err, req, res, next) {
    res.status(404).send({
        'code': 404,
        'message': 'Not found'
    });
    res.status(500).send({
        'code': 500,
        'message': 'Internal Server Error'
    });
    res.status(400).send({
        'code': 400,
        'message': 'Bad Request'
    });
    res.status(504).send({
        'code': 504,
        'message': 'Gateway Timeout'
    });
    res.status(403).send({
        'code': 403,
        'message': 'Access forbidden'
    });
    res.status(503).send({
        'code': 503,
        'message': 'Service Temporarily Unavailable'
    });
})
app.listen(config.server_port, function () {
    console.log('Task microservice was listening on port !' + config.server_port);
});