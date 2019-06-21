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

app.use(express.json())

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));



connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
})

app.post('/api/addUser', function(request, response){

  sendResponse = () => {
    console.log('userExists: ' + userExists);
  }

  var processData = (userInput) => {
    var hash = bcrypt.hashSync(userInput.password, saltRounds);
    userInput.password = hash;
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
        // console.log(result);
        resolve();
      })
    })
  }

  var userInput = request.body;
  processData(userInput)
    .then(() => {
      response.send({ 'userExists': userExists})
    })
});

app.post('/api/login', function(request, response){
  console.log('LOGIN');
  var userInput = request.body;
  console.log(userInput);

  (authorizeUser = (userInput) => {
    console.log('authorizeUser');
  })();
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
