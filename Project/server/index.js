// require("dotenv").config({ path: __dirname + "/.env" });
// const express = require('express');

// const app = express();

// const PORT = process.env.PORT || 9000;

// //Here you can add your routes
// //Here's an example
// app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });

// app.listen(PORT, () => {
//     console.log(`Server listening on the port  ${PORT}`);
// })

require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");

const app = express();

const PORT = process.env.PORT || 9000;

//Functions
const getProducts =  (req, res) => {
  pool.query('SELECT * FROM products', (error, products) => {
    if (error) {
      throw error
    }
    res.status(200).json(products.rows)
  })
}

//Here you can add your routes
//Here's an example
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get('/products', getProducts)


app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})