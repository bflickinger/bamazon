var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MS@yrk00n1969',
    database : 'bamazon'
});

connection.connect();

connection.query('SELECT * FROM bamazon.products', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    console.log('Number of rows: ' + results.length);
  });

connection.end();