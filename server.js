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
const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


// Handles any requests that don't match the ones above

// var tk = require('timekeeper');
// var time = new Date("September 20, 2019 11:13:00"); // January 1, 2030 00:00:00
//
// tk.travel(time); // Travel to that date.

var salt = bcrypt.genSaltSync(10);

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//   database: 'bazar'
// })

const connection = mysql.createConnection('mysql://mg4opeawp8ui3iid:kmfa3zmrbah3kdlv@b8rg15mwxwynuk9q.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/wu7l1lxe3pwecdjb')


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected');
})

//create database
const createDataBase = () => {
  console.log('createDataBase()');
  var sql = `CREATE DATABASE bazar;`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

//check if votes table exists
const checkVotesTable = () => {
  console.log('checkVotesTable()');
  var sql = `
    SELECT *
    FROM information_schema.tables
    WHERE table_schema = 'vw0iyuuac3o6eolw'
        AND table_name = 'votes'
    LIMIT 1;
  `
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      createVotesTable();
    }
  });
}
checkVotesTable();

const createVotesTable = () => {
  console.log('createVotesTable()');
  var sql =
  `CREATE TABLE votes (
    id VARCHAR(30) PRIMARY KEY,
    voteProducts VARCHAR(30),
    voteDate DATE
  )`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

//check if user table exists
const checkUsersTable = () => {
  console.log('checkUsersTable()');
  var sql = `
    SELECT *
    FROM information_schema.tables
    WHERE table_schema = 'vw0iyuuac3o6eolw'
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
checkUsersTable();

const createUsersTable = () => {
  console.log('createUsersTable');
  var sql =
  `CREATE TABLE users (
    id VARCHAR(30) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(60) NOT NULL,
    admin TINYINT(1) NOT NULL,
    lastOrderDate DATE,
    lastOrderProducts VARCHAR(30),
    fileFormat VARCHAR(10),
    fileName VARCHAR(30)
  )`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

const checkProductsTable = () => {
  console.log('checkProductsTable()');
  var sql = `
    SELECT *
    FROM information_schema.tables
    WHERE table_schema = 'vw0iyuuac3o6eolw'
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
checkProductsTable()

const createProductsTable = () => {
  console.log('createProductsTable');
  var sql =
  `CREATE TABLE products (
    id VARCHAR(30) PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    productType VARCHAR(20) NOT NULL,
    numberOfVotes INT,
    lastOrderDate INT,
    fileFormat VARCHAR(10),
    fileName VARCHAR(30)
  )`
  connection.query(sql, (err, result) => {
    if (err) throw err;
  })
}

const createUser = async (input) => {
  console.log('createUser');
    var sql = "INSERT INTO users SET ?";
    connection.query(sql, [input], (err, result) => {
      if (err) throw err;
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

  //add id and add admin value
  var adminProperty = {admin: false};
  var idProperty = {id: shortid.generate()}
  Object.assign(clone, adminProperty, idProperty);

  //delete file and picture properties to conform with sql
  delete clone.file;
  delete clone.base64;

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
  let fileName = shortid.generate()
  if (result) {
    connection.query('UPDATE users SET fileName = ? WHERE id = ?', [fileName, filteredInput.id], (error, results, fields) => {
      if (error) throw error;
    })
    await saveImage(request.body.base64, request.body.fileFormat, fileName, 'client/public/images/users/')
  }
  response.send(result)
})


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

passport.serializeUser(function(user, done){
  console.log('serializeUser');
 done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log('deserializeUser');
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

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

app.use(connect.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    // if(req.body.remember){
    //  req.session.cookie.maxAge = 1000 * 60 * 3;
    // }else{
    //  req.session.cookie.expires = false;
    // }
    if (err) { return next(err); }
    if (!user) { return res.send(false); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(true);
    });
  })(req, res, next);
});

app.get('/api/userData',
isLoggedIn,
function(req, res){
  console.log('/api/userData');
  var clone = Object.assign({}, req.user);

  //filter user object which is sent to client: delete password, delete id (not id), and change admin property to boolean
  clone.admin = !!clone.admin;
  clone.picturePath = `/images/users/${req.user.id}.${req.user.fileFormat}`
  delete clone.password;

  res.send(clone)
});

function isLoggedIn(req, res, next){
 console.log('isLoggedIn()');
 if(req.isAuthenticated())
 {
   console.log(true);
   return next();
 }
 console.log(false);
 res.redirect('/');
}

function isAdmin(req, res, next){
 console.log('isAdmin()');
 if(req.user.admin)
 {
   console.log(true);
   return next();
 }
 console.log(false);
 res.redirect('/');
}

app.post('/api/editUser',
isLoggedIn,
async (req, res) => {
  console.log('/api/editUser');
  //check if user is who he says he is OR if user is admin
  if ((req.body.id === req.user.id) || req.user.admin) {
    await updateUser(req.body, req.user)
    res.send(true)
  }
  else {
    console.log('he is not who he says he is');
  }
})

app.post('/api/deleteUser',
isLoggedIn,
async (req, res) => {
  console.log('/api/deleteUser');
  //check if user is who he says he is OR if user is admin
  if (req.body.id === req.user.id) {
    await deleteUser(req)
    await req.session.destroy(function (err) {
      res.send(JSON.stringify(
        {
          success: true,
          logout: true
        }
      ))
    });
  }
  else if (req.user.admin) {
    await deleteUser(req)
    res.send(JSON.stringify(
      {
        success: true,
        logout: false
      }
    ))
  }
  else {
    res.send(JSON.stringify(
      {
        success: false
      }
    ))
  }
})

const deleteUser = async (req, res) => {
  console.log('deleteUser()');
  //delete user entry in db
  connection.query('DELETE FROM users WHERE id = ?', [req.body.id], async (error, results, fields) => {
    if (error) throw error
  })
  //delete user image
  fs.unlink(`client/public${req.body.file}`, err => {
    if (err) throw err;
    console.log('file deleted');
  })
}

const deleteImage = async (fileDirectory, fileName, fileFormat) => {
  console.log('deleteImage');
  fs.unlink(`${fileDirectory}${fileName}.${fileFormat}`, err => {
    if (err) throw err;
    console.log(`file ${fileName} deleted`);
    return
  })
}

const updateUser = async (input, currentUser) => {
  console.log('updateUser');

  //see if a new image was uploaded by checking value of base64 (empty if no new picture was uploaded)
  if (input.base64) {
    // if yes: save new image, delete old image
    let fileName = shortid.generate()
    await saveImage(input.base64, input.fileFormat, fileName, 'client/public/images/users/')
    var oldFile = connection.query('SELECT fileName, fileFormat FROM users WHERE id = ?', [input.id], async (error, results, fields) => {
      await deleteImage('client/public/images/users/', results[0].fileName, results[0].fileFormat)
    })
    connection.query('UPDATE users SET fileName = ?, fileFormat = ? WHERE id = ?', [fileName, input.fileFormat, input.id], (error, results, fields) => {
      if (error) throw error;
    })
  }

  //update user values in databse
  connection.query('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?', [input.firstName, input.lastName, input.email, input.id], (error, results, fields) => {
    if (error) throw error;
  })

  //if current user is admin: update admin value of target user in database
  if (currentUser.admin) {
    connection.query('UPDATE users SET admin = ? WHERE id = ?', [input.admin, input.id], (error, results, fields) => {
      if (error) throw error;
    })
  }
}

app.get('/api/userList',
isLoggedIn,
isAdmin,
async (req, res) => {
  console.log('/api/userList');
  //access all users form databse
  connection.query('SELECT id, firstName, lastName, email, admin, fileFormat, fileName FROM users', (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify(results));
  })
})

app.get('/api/logout',
  async(req, res) => {
    console.log('/api/logout');
    await req.session.destroy(function (err) {
      if (err) throw err;
      res.send(true)
    });
  }
)

app.post('/api/editProduct',
isLoggedIn,
isAdmin,
  async(req, res) => {
    console.log('/api/editProduct');
    //differentiate between old products (update) and new products
    if (req.body.id) {
      //old product
      console.log('old product');
      //update old product (image and db)
      let result = await updateProduct(req.body)
      res.send(result)
      return
    }
    else if (!req.body.id) {
      //new product
      console.log('new product');
      //create new product (image and db)
      let result = await createNewProduct(req.body)
      res.send(result)
      return
    }
  }
)

const updateProduct = async (input) => {
  console.log('updateProduct()');

  //see if a new image was uploaded by checking value of base64 (empty if no new picture was uploaded)
  if (input.base64) {
    //generate new image name
    let fileName = shortid.generate()

    //access old file name and format
    await connection.query('SELECT fileName, fileFormat FROM products WHERE id = ?', [input.id], async (error, results, fields) => {
      if (error) throw error
      //delete old file
      await deleteImage('client/public/images/products/', results[0].fileName, results[0].fileFormat)
    })

    //save new image with new name
    await saveImage(input.base64, input.fileFormat, fileName, 'client/public/images/products/')

    //update product (fileName and fileFormat) in DB
    await connection.query('UPDATE products SET fileName = ?, fileFormat = ? WHERE id = ?', [fileName, input.fileFormat, input.id], (error, results, fields) => {
      if (error) throw error;
    })
  }

  //update product values in databse
  await connection.query('UPDATE products SET productName = ?, productType = ? WHERE id = ?', [input.productName, input.productType, input.id], (error, results, fields) => {
    if (error) throw error;
  })
  return true
}

const createNewProduct = async (input) => {
  console.log('createNewProduct()');
  var productId = shortid.generate();
  var fileName = shortid.generate();
  await saveImage(input.base64, input.fileFormat, fileName, 'client/public/images/products/')
  connection.query('INSERT INTO products SET id = ?, productName = ?, productType = ?, fileName = ?, fileFormat = ?', [productId, input.productName, input.productType, fileName, input.fileFormat], (error, results, fields) => {
    if (error) throw error;
  })
  return true
}

app.get('/api/productsData',
isLoggedIn,
async (req, res) => {
  console.log('/api/productsData');
  //access all users form databse
  connection.query('SELECT * FROM products', (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify(results));
  })
})

app.post('/api/deleteProduct',
isLoggedIn,
isAdmin,
async (req, res) => {
  console.log('/api/deleteProduct');
  let result = await deleteProduct(req)
  res.send(JSON.stringify(result))
})

const deleteProduct = async (req, res) => {
  console.log('deleteProduct()');
  //delete product entry in db
  await connection.query('DELETE FROM products WHERE id = ?', [req.body.id], async (error, results, fields) => {
    if (error) throw error;
  })
  //delete product image
  await fs.unlink(`client/public${req.body.file}`, err => {
    if (err) throw err;
    console.log('file deleted');
  })
  return true
}

var todaysDate = new Date().toISOString().split("T")[0]

var prevSaturday = new Date();
prevSaturday.setDate(prevSaturday.getDate() - (prevSaturday.getDay() + 1) % 7);
prevSaturday = prevSaturday.toISOString().split("T")[0];


app.post('/api/voteProducts',
isLoggedIn,
async (req, res) => {
  console.log('/api/voteProducts');

  //update user list (user's last order and order date)
  await updateUserTable(req, res)

  //potentially reset votes table
  await resetVotesTable(req, res);

  //update votes table
  await updateVotesTable(req, res)

  res.send(true)
})

updateUserTable = (req, res) => {
  return new Promise((resolve, reject) => {
    console.log('updateUserTable()');
    // this is the funciton which updates the user row in user list when the user submits vote
    connection.query('UPDATE users SET lastOrderProducts = ?, lastOrderDate = ? WHERE id = ?', [req.body.join(), todaysDate, req.user.id], (error, results, fields) => {
      if (error) throw error;
      resolve()
    })
  })
}

resetVotesTable = (req, res) => {
  return new Promise((resolve, rejet) => {
    console.log('resetVotesTable()');
    //check if any votes have been cast before last saturday
    connection.query('SELECT * FROM votes WHERE voteDate < ?', [prevSaturday], (error, results, fields) => {
      if (error) throw error;

      //if yes: reset votes table
      else if (results.length > 0) {
        console.log('reset table');
        connection.query('TRUNCATE TABLE votes', (error, results, fields) => {
          console.log(true);
          if (error) throw error;
          resolve()
        })
      }

      //if no: don't reset tables
      else {
        console.log(false);
        resolve()
      }
    })
  })
}

updateVotesTable = (req, res) => {
  return new Promise((resolve, reject) => {
    console.log('updateVotesTable()');
    //has this user voted before
    connection.query('SELECT * FROM votes WHERE id = ?', [req.user.id], async (error, results, fields) => {
      if (error) throw error;

      else if (results.length > 0) {
        //if user HAS voted before: update user entry
        await connection.query('UPDATE votes SET voteProducts = ?, voteDate = ? WHERE id = ?', [req.body.join(), todaysDate, req.user.id], (error, results, fields) => {
          if (error) throw error;
          resolve()
        })
      }

      else if (results.length === 0) {
        //if user HAS NOT voted before: create new user entry
        await connection.query('INSERT INTO votes SET id = ?, voteProducts = ?, voteDate = ?', [req.user.id, req.body.join(), todaysDate], (error, results, fields) => {
          if (error) throw error
          resolve()
        })
      }
    })
  })
}

app.get('/api/resultsData',
isLoggedIn,
async (req, res) => {
  console.log('/api/resultsData');

  //check if any of the votes have been cast before last saturday ==> if yes: discard
  await resetVotesTable(req, res);

  let results = await getResults(req, res)

  res.send(results)

});

getResults = (req, res) => {
  return new Promise((resolve, reject) => {
    console.log('getResults()');
    connection.query('SELECT voteProducts FROM votes', (error, results, fields) => {
      if (error) throw error;
      resolve(results)
    })
  })
}

app.get('/api/isLoggedIn',
async (req, res) => {
  console.log('/api/isLoggedIn');
  if(req.isAuthenticated()) {
    res.send(true)
  }
  else {
    res.send(false)
  }
});

app.get('/api/isAdmin',
async (req, res) => {
  console.log('/api/isAdmin');
  if(req.user.admin) {
    res.send(true)
  }
  else {
    res.send(false)
  }
});

app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
