## Task micro-service

## Problem statement

You are tasked with building a system to keep track of your tasks. You will need to write CRUD APIs for managing tasks and API to get the metrics for your tasks. You should use Node.js for the backend, any SQL database for managing database interactions.
1. API to create a task.
2. API to update a task
3. API to get all tasks, make API paginated.
4. API to get task metrics like counts tasks on basis of status and timeline Example:
    [
    {
    "date": "July 2023",
    "metrics": {
    "open_tasks": 0,
    "inprogress_tasks": 0,
    "completed_tasks": 30
    }
    },
    {
    "date": "August 2023",
    "metrics": {
    "open_tasks": 10,
    "inprogress_tasks": 30,
    "completed_tasks": 50
    }
    }
    ]

**ms-task** is the task activity based Microservice for creating,updating and getting task status and count.

It was developed using **Node-js**
Database : **MYSQL**

## Inside Task micro -service :

 * Based on Input data we are doing the process in this service we are having multiple api
 * /tasks - POST - For creating task
 * /tasks - PUT  - For update task
 * /tasks - GET - For getting task using pagination
 * /tasks-metrices  - GET  - For getting metrices of task based on date


## MYSQL

* Create database task
* Create a table Query
    CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        task_description TEXT,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ALTER TABLE tasks
    ADD COLUMN status ENUM('open', 'in-progress', 'completed') NOT NULL DEFAULT 'open';

## Steps to execute the package

1. Download the package from GIT 
2. Unzip the package
3. Run npm install
4. Complete the mysql table and database creation steps (need to execute the query given above)
5. Update the mysql credentials in config.js file
6. Run the node task.js command app start working in the below url http://localhost:9009/
7. Use the postman collection to test the api.
   https://api.postman.com/collections/23059784-59411e06-d78d-44b6-849f-ff8e809659e3?access_key=PMAT-01HBARG4TNSP49Z5WRRXEQRRDW


    

  