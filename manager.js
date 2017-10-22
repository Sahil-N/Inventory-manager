var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('easy-table')

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'password',
  database : 'marketplace'
});



function start() {
  inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do?",
      choices: ["View Products", "View Low Inventory", "Increase Inventory", "Add New Product", "Quit"],
      name: "manager"
    }
  ])  
  .then(function(iResponse) {
    switch (iResponse.manager) {

      case "View Products":
        view();
      break;

      case "View Low Inventory":
        viewLow();
        console.log("");
      break;

      case "Increase Inventory":
        iInventory();
      break;

      case "Add New Product":
        addProduct();
      break;

      case "Quit":
        console.log("goodbye");
        connection.end();
      break;
    }
  })
}

function view() {
  var query = connection.query('select * from products', function(error, results, fields) {
  if (error) {
    console.log(error);
  };
    console.log("");
    console.log("");
    console.log("");
    console.log(Table.print(results));
    start();
  })
}




function viewLow() {
  console.log(" ");
  console.log("Low Inventory List: ")

  connection.query("SELECT product_name, quantity FROM products WHERE quantity BETWEEN ? AND ?", [0,10],

    function(err, data){
      // console.log(err);
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i])
        console.log(data[i].product_name + ": " + data[i].quantity); 
      }
      console.log(" ");
      start();
    })
}


function addProduct() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the product you are selling",
      name: "product",
    },
    {
      type: "input",
      message: "What department does this item belong to",
      name: "department",
    },
    {
      type: "input",
      message: "What is the item's SKU number?",
      name: "sku",
    },
      {
      type: "input",
      message: "What is the price?",
      name: "price",
    },
    {
      type: "input",
      message: "Quantity",
      name: "quantity",
    },
    ])
  .then(function(iResponse) {

    var newProduct = {
      product_name : iResponse.product,
      item_sku : iResponse.sku,
      department : iResponse.department, 
      retail_price : parseFloat(iResponse.price), 
      quantity : parseInt(iResponse.quantity)
    };

    connection.query(
      "INSERT INTO products SET ?",
      newProduct,
      function(err, res) {
        console.log(res.affectedRows + " product inserted!\n");
        start();
      }
    );
  })
}



function iInventory() {

  var products = [];
  connection.query("SELECT * FROM products", function(error, results, fields) {
      if (error) {
        console.log(error);
      };
      for (var i = 0; i < results.length; i++) {
        products[i] = results[i].product_name;
      } //for end
  inquirer.prompt([
    {
      type: "list",
      message: "Which product would you like to add inventory to?",
      choices: products,
      name: "increaseInventory"
    },
    {
      type: "input",
      message: "Quantity added:",
      name: "quantityIncrease"
    }])
  .then(function(iResponse) {
    var pickProduct = iResponse.increaseInventory;
    var increaseAmount = iResponse.quantityIncrease;
    connection.query('SELECT quantity FROM products WHERE ?', [{product_name: pickProduct}], function(err, res){
    var initialQuantity = res[0].quantity;
    var updatedQuantity = initialQuantity + increaseAmount;
    connection.query("UPDATE products SET quantity = ? WHERE product_name = ?", [updatedQuantity, pickProduct]);
    view()
    start();
    })
  })
})
}

start();