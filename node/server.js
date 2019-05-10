const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const config = require('./config');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database
});



app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/html/index.html'));
});
app.get('/getProducts', (req, res) => {
    connection.query(
        'SELECT * FROM `tblProduct`',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.send(results[0]);


        }
    );

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

