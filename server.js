const express = require('express');
const mysql= require("mysql");

const app = express();

app.use(express.json())

var customerData;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  database: 'expressreact'
})

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
  let sql = "SELECT * FROM customers";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    customerData = result;
    console.log(result);
  })
})

app.get('/api/customers', (req, res) => {
  res.json(customerData);
})

app.post('/api/addUser', function(request, response){
  var userInput = request.body;
  console.log(userInput);
});


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
