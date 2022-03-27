const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
uniqid = require('uniqid')

const {storage} = require("./database/storage");

const users = require("./routes/users");
const messages = require("./routes/message");

/*
const todo = require("./routes/todo");
*/


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));

const api_version_url = "/api/v1";
const http_port = process.env.PORT;

global.database = storage;

app.use(api_version_url + "/users", users);
//app.use(api_version_url + "/todo", todo);
app.use(api_version_url + "/message", messages);


app.get(api_version_url + "/", (req, res) => {
    res.send(`
        <h1>Welcome to Sample CRUD API</h1>
        <h2>API Documentation </h2>
        <a href="https://www.getpostman.com/collections/d0c25607a5a71e79bd34">API Documentation Postman</a>
    `);
});

app.listen(http_port, "0.0.0.0", () => {
    console.log("Server started at port " + http_port);
});

module.exports = app;

