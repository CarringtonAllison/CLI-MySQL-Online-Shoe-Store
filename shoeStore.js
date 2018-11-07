const mysql = require("mysql");
const inquire = require("inquirer");
const cTable = require("console.table");
const start =require("./startProgram")

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
    console.log("\nWELCOME TO RAIN'S SHOE STORE! \n")
    runProgram();
});

//starting function 
function runProgram() {
    inquire.prompt([
        {
            type: "confirm",
            name: "start",
            message: "DO YOU WANT TO SEE THE SHOES WE HAVE?"
        }
    ]).then(function (res) {
        if (res.start) {
            connection.query(
                "SELECT item_id, product_name, department_name, price FROM shoes",
                // "SELECT item_id, product_name, department_name, price FROM shoes",
                function (err, data) {
                    console.log("\n")
                    console.table(data)
                    chooseShoe();
                });
        } else {
            whatsWrongWithYou();
        }
    });
};

function chooseShoe() {
    inquire.prompt([
        {
            type: "prompt",
            name: "choice",
            message: "PLEASE ENTER THE ID # OF THE SHOES YOU WANT"
        }
    ]).then(function (res) {
        console.log("\nHERE IS YOUR SHOE\n")
        let choice = res.choice;
        connection.query(
            "SELECT item_id, product_name, department_name, price FROM shoes WHERE item_id = ?",
            choice,
            function (err, data) {
                if (err) throw err;
                console.table(data);
                console.log("\n");
                quantityAndPrice(data);
            });
    });
}

function whatsWrongWithYou() {
    console.log("\nFINE THEN DONT LOOK AT MY INVENTORY! COME BACK WHEN YOU AREN'T BROKE!!!\n")
    start(); 

}

function quantityAndPrice(info) {
    // let stock = info[0].stock_quantity;
    let choice = info[0].item_id;
    let price = info[0].price;
    let shoeName = info[0].product_name;
    inquire.prompt([
        {
            type: "input",
            name: "quantity",
            message: "HOW MANY PAIRS OF THESE SHOES DO YOU WANT TO BUY?"
        }
    ]).then(function (res) {
        let userQuantity = res.quantity;
        let totalPrice = price * userQuantity;
        connection.query(
            "SELECT stock_quantity FROM shoes WHERE item_id = ?",
            choice,
            function (err, data) {
                let stock = data[0].stock_quantity
                if (userQuantity < stock) {
                    console.log("\nIT'S YOUR LUCKY DAY WE HAVE " + stock + " LEFT IN STOCK! \nSO WE CAN GO AHEAD AND GET YOU " + userQuantity + " OF the " + shoeName + " TODAY.")
                } else {
                    console.log("OH NO! WE UNFORTUNETLY DO NOT HAVE ENOUGH IN OUR INVENTORY! WE ONLY HAVE " + stock + " LEFT!")
                }
                console.log("\n\nTOTAL PRICE \n-----------\n$" + totalPrice + " FOR " + userQuantity + " OF the " + shoeName + "\n\nTHANK YOU FOR YOUR PURCHASE!\n");

                // updating the database 
                connection.query(
                    "UPDATE shoes SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stock - userQuantity
                        },
                        {
                            item_id: choice
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    });
                connection.query(
                    "UPDATE shoes SET ? WHERE ?",
                    [
                        {
                            sales: totalPrice
                        },
                        {
                            item_id: choice
                        }
                    ],
                    function (err, data) {
                        if (err) throw err;
                        // console.log(data)
                        shopMore();
                    }
                )
            });

    });
}

function shopMore() {
    inquire.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "DO YOU WANT TO MAKE ANOTHER PURCHASE"
        }
    ]).then(function (data) {
        if (data.continue) {
            connection.query(
                "SELECT item_id, product_name, department_name, price FROM shoes",
                function (err, data) {
                    console.log("\n")
                    console.table(data)
                    chooseShoe();
                });
        } else {
            console.log("\nTHANKS FOR SHOPPING AT RAIN'S SHOE STORE!\n");
            // connection.end();
            start();
        }
    })
}
