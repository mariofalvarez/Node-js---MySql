const mysql = require("mysql")
const Table = require("cli-table")
const inquirer = require("inquirer")

const table = new Table({
  head: ["ID", "Item", "Department", "Price", "Stock"],
  colWidths: [10, 30, 30, 10, 10]
})

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mollybear",
  database: "bamazon"
})

emptyCart = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Would you like to purchase another item?",
      choices: ["Yes", "No"],
      name: "shopAgain"
    })
    .then(res => {
      if (res.shopAgain === "Yes") {
        mainMenu()
      } else {
        console.log("Thank you for shopping with us. Have a great day!")
        connection.end()
      }
    })
}

checkoutCart = (userInputId, userInputQuantity) => {
  connection.query(
    "SELECT * FROM products WHERE item_id = " + userInputId,
    (err, res) => {
      if (err) throw err
      if (userInputQuantity <= res[0].stock_quantity) {
        const totalCost = res[0].price * userInputQuantity
        console.log(
          "\nThis is a confirmation message that your order is in stock and will ship out shortly to you!"
        )
        console.log(
          "The total cost for " +
            userInputQuantity +
            "x " +
            res[0].product_name +
            " = $" +
            totalCost +
            ".\n"
        )
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - " +
            userInputQuantity +
            " WHERE item_id = " +
            userInputId
        )
        emptyCart()
      } else {
        console.log(
          "\nYou order appears to be out of stock, we apologize for the inconvenience.\n"
        )
        emptyCart()
      }
    }
  )
}

addToCart = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID number of the item you wish to purchase?",
        name: "Id"
      },
      {
        type: "input",
        message: "How many would you like to purchase?",
        name: "Quantity"
      }
    ])
    .then(res => {
      checkoutCart(res.Id, res.Quantity)
    })
}

showInventory = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ])
    }
    console.log("\n\n" + table.toString())
  })
}

mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message:
        "Welcome traveler! My shop has something for everyone. Would you like to take a look at my shop?",
      choices: ["Look at Store", "Leave"],
      name: "mainmenuchoice"
    })
    .then(res => {
      if (res.mainmenuchoice === "Leave") {
        connection.end()
      } else {
        showInventory()
        addToCart()
      }
    })
}

connection.connect(err => {
  if (err) throw err
  console.log(`Connected to thread ID: ${connection.threadId}`)
  mainMenu()
})
