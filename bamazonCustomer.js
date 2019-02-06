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
  console.log('---------------------------------------------------------------');
  console.log(`|                       Bamazon Customer                      |`);
  console.log('---------------------------------------------------------------\n');
  inventoryPrint();
});

function inventoryPrint() {
  console.log('Current Inventory:\n')
  let inventory = "SELECT item_id, product_name, price from PRODUCTS";
  connection.query(inventory, function (err, res) {
    res = JSON.stringify(res);
    res = res.replace(/item_id/g, 'Item ID').replace(/product_name/g, 'Product Name').replace(/department_name/g, 'Department').replace(/price/g, 'Price').replace(/stock_quantity/g, 'In Stock');
    res = JSON.parse(res);
    console.table(res);
    console.log('-------------------------------------\n');
    buyProduct();
  });
}

function buyProduct() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "itemChoice",
          type: "input",
          message: "Which product item would you like to select?"
        },
        {
          name: "quantChoice",
          type: "input",
          message: "What quantity would you like to purchase?"
        }
      ])
      .then(function (answer) {
        let userChoice = results[answer.itemChoice - 1];
        if (userChoice.stock_quantity < parseInt(answer.quantChoice)) {
          console.log("Not enough inventory!  Please select again.")
          buyProduct();
        }
        else {
          let newQuantity = userChoice.stock_quantity - parseInt(answer.quantChoice);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: newQuantity },
              { item_id: userChoice.item_id }
            ],
          );
          console.log('-------------------------------------');
          console.log("The cost to you is $" + (userChoice.price * answer.quantChoice));
          console.log('-------------------------------------\n');
          connection.end();
        }
      });
  });
}