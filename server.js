const mysql = require("mysql");
const express = require('express');
const app = express();

//Encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

// //Authentication
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');


var userExists;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  database: 'bazar'
})

// app.use(express.json())
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));



connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
})

//check if user table exists
const checkUsersTable = () => {
  console.log('checkUsersTable');
  var sql = `
    SELECT *
    FROM information_schema.tables
    WHERE table_schema = 'bazar'
        AND table_name = 'users'
    LIMIT 1;
  `
  connection.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
      createUsersTable();
    }
  });
}
checkUsersTable()

const createUsersTable = () => {
  console.log('createUsersTable');
  var sql =
  `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL,
    password BINARY(60) NOT NULL,
    uniqueId VARCHAR(30),
    admin TINYINT(1)
  )`
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
}


// app.post('/api/addUser', function(request, response){
//
//   sendResponse = () => {
//     console.log('userExists: ' + userExists);
//   }
//
//   var processData = (userInput) => {
//     var hash = bcrypt.hashSync(userInput.password, saltRounds);
//     userInput.password = hash;
//     return new Promise((resolve, reject) => {
//       console.log('processData');
//       (async () => {
//         await checkUser(userInput);
//         if (!userExists) {
//           createUser(userInput);
//         }
//         resolve();
//       })();
//     })
//   }
//
//   checkUser = (userInput) => {
//     return new Promise((resolve, reject) => {
//       console.log('checkUser');
//       var userEmail = userInput.email;
//       console.log(userEmail);
//       var sql = "SELECT 1 FROM users WHERE email = ?"
//       connection.query(sql, [userEmail], (err, result) => {
//         if (err) throw err;
//         //if user does NOT exist
//         if (result.length == 0) {
//           console.log('USER DOES NOT EXIST');
//           userExists = false;
//           resolve();
//         }
//         //if user DOES exist
//         else {
//           console.log('USER DOES EXIST');
//           userExists = true;
//           resolve();
//         }
//       })
//     })
//   }
//
//   createUser = (userInput) => {
//     return new Promise((resolve, reject) => {
//       console.log('createUser');
//       var sql = "INSERT INTO users SET ?";
//       connection.query(sql, [userInput], (err, result) => {
//         if (err) throw err;
//         // console.log(result);
//         resolve();
//       })
//     })
//   }
//
//   var userInput = request.body;
//   processData(userInput)
//     .then(() => {
//       response.send({ 'userExists': userExists})
//     })
// });

// app.post('/api/login', function(request, response){
//   console.log('LOGIN');
//   var userInput = request.body;
//   console.log(userInput);
//
//   (authorizeUser = (userInput) => {
//     console.log('authorizeUser');
//   })();
// })

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
