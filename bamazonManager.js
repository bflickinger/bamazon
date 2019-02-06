const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P4ssw0rd',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    console.log('\clear');
    getChoice();
});

function getChoice() {
    console.log('\n');
    console.log('---------------------------------------------------------------');
    console.log(`|                       Bamazon Manager                       |`);
    console.log('---------------------------------------------------------------');
    console.log('\n');
    inquirer
        .prompt([
            {
                type: "list",
                name: "transaction",
                message: "Please select your transaction...\n",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
            },
        ])
        .then(answers => {
            switch (answers.transaction) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    connection.end();
            }
        });
}

function viewProducts() {
    // console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res = JSON.stringify(res);
        res = res.replace(/item_id/g,'Item ID').replace(/product_name/g,'Product Name').replace(/department_name/g,'Department').replace(/price/g,'Price').replace(/stock_quantity/g,'In Stock');
        res = JSON.parse(res);
        console.table(res);
        console.log('---------------------------------------------------------------');
    });
    getChoice();
}

function viewLowInventory() {
    // select * where table.inventory <5
    console.log('-----------------------------');
    getChoice();
}

function addToInventory() {
    // update inventory
    console.log('-----------------------------');
    getChoice();
}

function addNewProduct() {
    // insert product
    console.log('-----------------------------');
    getChoice();
}