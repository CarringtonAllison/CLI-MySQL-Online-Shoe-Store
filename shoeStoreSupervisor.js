const mysql = require("mysql");
const inquire = require("inquirer");
const cTable = require("console.table");

//database info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "shoeStore_db"
});

//connecting to the database and start running the program
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWELCOME TO RAIN'S SHOE STORE!\n")
    runProgram();
});


//starting function 
function runProgram() {
    inquire.prompt([
        {
            type: "list",
            name: "start",
            message: "WHAT WOULD YOU LIKE TO DO?\n",
            choices: ["View Shoe Sales by Department", "Create New Department", "---DONE---"]
        }
    ]).then(function (data) {
        let choice = data.start;
        switch (choice) {
            case "View Shoe Sales by Department":
                viewDepartments();
                break;
            case "Create New Department":
                createNewDP();
                break;
            case "---DONE---":
                console.log("\nTHANKS AND HAVE A GREAT DAY!")
                connection.end();
                break;
        };
    })
}

function viewDepartments() {
    connection.query(
        "SELECT * FROM departments"
    )
}