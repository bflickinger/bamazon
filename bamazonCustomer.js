var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P4ssw0rd',
  database: 'bamazon'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startProcess();
});

function startProcess() {
  buyProducts()
}

function printAll() {
  connection.query('SELECT * FROM bamazon.products', function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      console.log(`ID: ${results[i].item_id} - Name: ${results[i].product_name} - Cost: \$${results[i].price}`)
    }
    console.log('------------------------------------------------------------------');
    return results;
  });
}

function buyProducts() {
  let results = printAll();
  console.log(results)
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What ID would you like to purchase?'
    },
    {
      type: 'input',
      name: 'amount',
      message: 'How many do you want to purchase?'
    }
  ]).then(function (answer) {
    if ((results[answer.id].stock_quantity - answer.amount) >= 0) {
      console.log(results[answer.id].stock_quantity);
      console.log('Purchase has been processed!');
    } else {
      console.log('Insufficent stock');
    }
  });
  connection.end();
}