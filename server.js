const mysql = require("mysql");
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const shortid = require('shortid');
const fs = require('fs');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

var salt = bcrypt.genSaltSync(10);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse application/json
app.use(bodyParser.json())

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
})

//create database
const createDataBase = () => {
  console.log('createDataBase');
  var sql = `CREATE DATABASE bazar;`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

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
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      createUsersTable();
    }
  });
}

const createUsersTable = () => {
  console.log('createUsersTable');
  var sql =
  `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(60) NOT NULL,
    uniqueId VARCHAR(30),
    admin TINYINT(1)
  )`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

const checkProductsTable = () => {
  console.log('checkProductsTable');
  var sql = `
    SELECT *
    FROM information_schema.tables
    WHERE table_schema = 'bazar'
        AND table_name = 'products'
    LIMIT 1;
  `
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      createProductsTable();
    }
  });
}

const createProductsTable = () => {
  console.log('createProductsTable');
  var sql =
  `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    productType VARCHAR(20) NOT NULL,
    uniqueId VARCHAR(30)
  )`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  })
}

const checkUserEmail = async (input) => {
  console.log('checkUserEmail');
  var sql = "SELECT 1 FROM users WHERE email = ?"
  connection.query(sql, [input.email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      console.log("User does not exist");
      return true;
    }
    else if (result.length === 1) {
      console.log("User does exist");
      return false;
    }
    else {
      console.log("Something is weird. See result:");
      console.log(result);
    }
  })
}

var beni = {
  firstName: "beni",
  lastName: "bargera",
  email: "benibargera@gmail.com",
  password: "yolo",
  uniqueId: "3",
  admin: true,
  lastOrderDate: '2008-11-11',
  lastOrderProducts: '[1, 2, 3, 4]'
}

const createUser = async (input) => {
  console.log('createUser');
    var sql = "INSERT INTO users SET ?";
    connection.query(sql, [input], (err, result) => {
      if (err) throw err;
      // console.log(result);
      return;
    })
}

checkUser = (userInput) => {
  return new Promise((resolve, reject) => {
    console.log('checkUser');
    var userEmail = userInput.email;
    var sql = "SELECT 1 FROM users WHERE email = ?"
    connection.query(sql, [userEmail], (err, result) => {
      if (err) throw err;
      //if user does NOT exist
      if (result.length == 0) {
        resolve(false);
      }
      //if user DOES exist
      else {
        resolve(true);
      }
    })
  })
}

const registerUser = async (input) => {
  console.log('registerUser');
  let value = await checkUser(input)
  if (value === true) {
    console.log('user exists');
    return false;
  }
  else {
    console.log('user does not exist');
    createUser(input);
    return true;
  }
}

const prepareUserInput = async (input) => {
  console.log('prepareUserInput');

  //encrypt password in original before cloning
  input.password = bcrypt.hashSync(input.password, salt)

  //clone input object upload from api
  var clone = Object.assign({}, input)

  //add uniqueID and add admin value
  var adminProperty = {admin: false};
  var uniqueIdProperty = {uniqueID: shortid.generate()}
  Object.assign(clone, adminProperty, uniqueIdProperty);

  //delete file and picture properties to conform with sql
  delete clone.file;
  delete clone.base64;
  delete clone.fileFormat;

  return clone;
}

const saveImage = async (base64, fileFormat, fileName, fileDirectory) => {
  console.log('saveImage');
  fs.writeFile(`${fileDirectory}${fileName}.${fileFormat}`, base64, 'base64', function(err) {
    if (err) throw err;
  });
  return;
}

app.post('/api/register',
async (request, response) => {
  console.log('/api/regsiter');
  let filteredInput = await prepareUserInput(request.body)
  let result = await registerUser(filteredInput);
  if (result) {
    await saveImage(request.body.base64, request.body.fileFormat, filteredInput.uniqueID, 'images/users/')
  }
  response.send(result)
})


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done){
  console.log('serializeUser');
  console.log(user);
 done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log('deserializeUser');
  console.log(id);
 connection.query("SELECT * FROM users WHERE id = ? ", [id],
  function(err, rows){
   done(err, rows[0]);
  });
});

passport.use(
 'local-login',
 new LocalStrategy({
  usernameField : 'email',
  passwordField: 'password',
  passReqToCallback: true
 },
 function(req, email, password, done){
  connection.query("SELECT * FROM users WHERE email = ? ", [email],
  function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, { message: 'Incorrect username.' });
    }
    else if(!bcrypt.compareSync(password, rows[0].password)) {
      return done(null, false, { message: 'Incorrect password.'});
    }
    else {
      return done(null, rows[0]);
    }
  });
 })
);

app.post('/api/login',
  passport.authenticate('local-login'),
  function(req, res){
    res.send(true)
  }
);





 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
