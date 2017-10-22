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
  var query = connection.query('select * from products', function(error, results, fields) {
  if (error) {
    console.log(error);
  };
    console.log("");
    console.log("");
    console.log("");
    console.log(Table.print(results));
    purchase();
})
}




function purchase() {
  inquirer.prompt([
      {
        type: "input",
        message: "Enter SKU of item you want to purchase",
        name: "sku"
      },
      {
        type: "input",
        message: "How many would you like to purchase?",
        name: "quantity",
      }
  ]).then(function(response) {
    var pSku = response.sku;response
    var newQuantity = parseInt(response.quantity);
    connection.query('SELECT quantity FROM products WHERE ?', [{item_sku: pSku}], function(err, res){
      var initialQuantity = res[0].quantity;
      var updatedQuantity = initialQuantity - newQuantity;
      connection.query("UPDATE products SET quantity = ? WHERE item_sku = ?", [updatedQuantity, pSku]);
      start();
    })
  })
}





start();
