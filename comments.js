// Create web server
// npm install express
// npm install body-parser
// npm install cors

const express = require('express'); //this line imports express
const bodyParser = require('body-parser'); // this line imports body-parser
const cors = require('cors'); // this line imports cors
const mysql = require('mysql'); // this line imports mysql

const app = express(); // this line creates an instance of express
app.use(cors()); // this line uses cors 
app.use(bodyParser.urlencoded({extended: false})); // this line uses body-parser
app.use(bodyParser.json()); // this line uses body-parser 

const db = mysql.createConnection({ // this line creates a connection to mysql
    host: 'localhost', // this line sets the host
    user: 'root',  // this line sets the user
    password: '', // this line sets the password
    database: 'comments' // this line sets the database
});

db.connect((err) => { // this line connects to the database
    if (err) { // this line checks if there is an error
        throw err; 
    }
    console.log('MySQL connected'); // Indicates that the connection is successful
});

// Create DB
app.get('/createdb', (req, res) => { // this line creates a database
    let sql = 'CREATE DATABASE comments'; // this line creates a database named comments
    db.query(sql, (err, result) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(result); // this line logs the result
        res.send('Database created'); // this line sends a response
    });
});

// Create table
app.get('/createtable', (req, res) => { // this line creates a table
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY (id))'; // this line creates a table named comments
    db.query(sql, (err, result) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(result); // this line logs the result
        res.send('Table created'); // this line sends a response
    });
});

// Insert comment
app.post('/comment', (req, res) => { // this line inserts a comment
    let comment = {name: req.body.name, comment: req.body.comment}; // this line creates a comment
    let sql = 'INSERT INTO comments SET ?'; // this line inserts a comment into the table
    let query = db.query(sql, comment, (err, result) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(result); // this line logs the result
        res.send('Comment added'); // this line sends a response
    });
});

// Select comments 
app.get('/comments', (req, res) => { // this line selects all comments
    let sql = 'SELECT * FROM comments'; // this line selects all comments from the table
    let query = db.query(sql, (err, results) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(results); // this line logs the result
        res.send(results); // this line sends a response
    });
});

// Select single comment
app.get('/comment/:id', (req, res) => { // this line selects a single comment
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`; // this line selects a single comment from the table
    let query = db.query(sql, (err, result) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(result); // this line logs the result
        res.send(result); // this line sends a response
    });
});

// Update comment
app.put('/comment/:id', (req, res) => { // this line updates a comment
    let sql = `UPDATE comments SET name = '${req.body.name}', comment = '${req.body.comment}' WHERE id = ${req.params.id}`; // this line updates a comment from the table
    let query = db.query(sql, (err, result) => { // this line queries the database
        if (err) throw err; // this line checks if there is an error
        console.log(result); // this line logs the result
        res.send('Comment updated'); // this line sends a response
    });
}
    
);