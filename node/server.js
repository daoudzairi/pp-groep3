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

const app = express();
const port = 3000;

const connection = mysql.createConnection(require('./config.json'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/books', (req, res) => {
    connection.query('SELECT * FROM `tblProduct`', (err, results, fields)  => {
            if(err) throw err;
            res.json(results);
        }
    );
});

app.get('/api/search/id=:id', (req, res) => {
    connection.query(`SELECT * FROM tblProduct WHERE ProductID = ${req.params.id}`, (err, results, fields)  => {
        if(err) throw err;
        res.json(results);
    });
});

app.get('/api/search/titel=:titel', (req, res) => {
    connection.query(`SELECT * FROM tblProduct WHERE Titel LIKE '%${req.params.titel}%'`, (err, results, fields) => {
        if(err) throw err;
        res.json(results);
    })
});

app.get('/api/search/uitvoerder=:uitvoerder', (req, res) => {
    connection.query(`SELECT * FROM tblProduct WHERE Uitvoerder LIKE '%${req.params.uitvoerder}%'`, (err, results, fields) => {
        if(err) throw err;
        res.json(results);
    })
});

app.get('/api/search/genre=:genre', (req, res) => {
    connection.query(`SELECT * FROM tblProduct WHERE Genre LIKE '%${req.params.genre}%'`, (err, results, fields) => {
        if(err) throw err;
        res.json(results);
    })
});

app.use((req, res) => {
    res.status(404).json({msg: "Could not find specified file."});
});
app.get('/getProducts', (req, res) => {
    connection.query(
        'SELECT * FROM `tblProduct`',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.send(results);


        }
    );

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
