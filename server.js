const express = require('express');
const mysql= require("mysql");

const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

app.use(express.json())

var customerData;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  database: 'bazar'
})

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
  // let sql = "SELECT * FROM customers";
  // connection.query(sql, (err, result) => {
  //   if (err) throw err;
  //   customerData = result;
  //   console.log(result);
  // })
})

// app.get('/api/customers', (req, res) => {
//   res.json(customerData);
// })

var userExists = "lol";

app.post('/api/addUser', function(request, response){
  var userInput = request.body;
  processData(userInput)
    .then(() => {
      response.send({ 'userExists': userExists})
    })
});

// var processData = async (userInput) => {
//   console.log('processData');
//   await checkUser(userInput);
//   if (!userExists) {
//     createUser(userInput);
//   }
// }

sendResponse = () => {
  console.log('userExists: ' + userExists);
}

var processData = (userInput) => {
  return new Promise((resolve, reject) => {
    console.log('processData');
    (async () => {
      await checkUser(userInput);
      if (!userExists) {
        createUser(userInput);
      }
      resolve();
    })();
  })
}

checkUser = (userInput) => {
  return new Promise((resolve, reject) => {
    console.log('checkUser');
    var userEmail = userInput.email;
    console.log(userEmail);
    var sql = "SELECT 1 FROM users WHERE email = ?"
    connection.query(sql, [userEmail], (err, result) => {
      if (err) throw err;
      //if user does NOT exist
      if (result.length == 0) {
        console.log('USER DOES NOT EXIST');
        userExists = false;
        resolve();
      }
      //if user DOES exist
      else {
        console.log('USER DOES EXIST');
        userExists = true;
        resolve();
      }
    })
  })
}

createUser = (userInput) => {
  return new Promise((resolve, reject) => {
    console.log('createUser');
    var sql = "INSERT INTO users SET ?";
    connection.query(sql, [userInput], (err, result) => {
      if (err) throw err;
      console.log(result);
    })
  })
}

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
