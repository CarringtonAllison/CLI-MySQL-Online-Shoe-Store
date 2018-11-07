const mysql = require("mysql");
const inquire = require("inquirer");
const cTable = require("console.table");
const start = require("./startProgram")


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
                return viewDepartments();
            case "Create New Department":
                return createNewDP();
            case "---DONE---":
                console.log("\nTHANKS AND HAVE A GREAT DAY!\n")
                return start();
        };
    })
}

function viewDepartments() {
    // console.log("help")

    connection.query(
        " SELECT d.department_id, d.department_name, d.over_head_costs, SUM(IFNULL(s.sales, 0)) as product_sales, SUM(IFNULL(s.sales, 0)) - d.over_head_costs as total_profit FROM shoes s RIGHT JOIN departments d ON s.department_name = d.department_name GROUP BY d.department_id, d.department_name, d.over_head_costs",
        function (err, data) {
            if (err) throw err;
            console.log("\n")
            console.table(data)
            console.log("\n")
            runProgram();
        })
}

function createNewDP() {
    inquire.prompt([
        {
            type: "input",
            name: "name",
            message: "\nWHAT IS THE NAME OF THE DEPARTMENT YOU WANT TO CREATE?\n"
        },
        {
            type: "input",
            name: "overHead", 
            message: "\nWHAT IS THE OVER HEAD COST OF THIS DEPARTMENT?\n"
        }
    ]).then(function (data) {
        let dpName = data.name;
        let overHead = data.overHead; 

        //database update
        connection.query(
            "INSERT INTO departments SET ?",
            [
                {
                    department_name: dpName,
                    over_head_costs: overHead
                    
                }
            ],
            function (err, res) {
                console.log("\nADDED " + dpName + " AS A NEW DEPARTMENT!\n\n")
                runProgram();
            }
        );
    })
}
