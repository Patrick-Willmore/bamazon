//install packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var {table} = require("table");


var sqlConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bitemsdb"
  });

  sqlConnection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    printItemList();
    
    console.log("connected as id " + sqlConnection.threadId);
  });

  const printItemList = function() {
    return new Promise( (resolve, reject) => {
        sqlConnection.query("SELECT * FROM `bitemsdb`.`products` LIMIT 1000;", function (err, res) {
            if (err) reject(Error(err));
            // Log all results of the SELECT statement
            var data = [];
            data.push(
                [
                    ('id'),
                    ('product_name'),
                    ('dept_name'),
                    ('price'),
                    ('quantity')
                ]
            );
            res.forEach(element => {
                data.push(
                    [
                        element.id,
                        element.product_name,
                        element.dept_name,
                        element.price,
                        element.quantity
                    ]
                );
            });
            console.log(table(data));
            resolve();
        });
    })

}
// start();
  function start() {
    inquirer
      .prompt({
        name: "userPrompt",
        type:"input",
        message: "what would you like to buy (#)?"
        
      })
      .then(function(answer) {
        console.log(answer);

      });
      
  }
  start();
//require
//inquirer.prompt .then(answers)
    //   * The first should ask them the ID of the product they would like to buy.
   //* The second message should ask how many units of the product they would like to buy.
//function check quantity
    //if >= 
        // func buy item
            //update quantity in mySQL database

    //total cost??