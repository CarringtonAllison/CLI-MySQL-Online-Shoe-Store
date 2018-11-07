const inquirer = require("inquirer");
const mysql = require("mysql")

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
    module.exports();
});


module.exports = function startUp() {

    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "CHOOSE YOUR VIEW?\n",
            choices: ["Customer", "Manager", "Supervisor", "---DONE---"]
        }
    ]).then(function (data) {
        let choice = data.start;
        switch (choice) {
            case "Customer":
                return require("./shoeStore");
            case "Manager":
                return require("./shoeStoreManager");
            case "Supervisor":
                return require("./shoeStoreSupervisor");
            case "---DONE---":
                console.log("\nTHANKS FOR USING RAIN'S SHOE STORE APP")
                connection.end();
                break;
        }
    })
}
