const mysql = require('mysql');

//connection is created
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'movie_ticket'
  });
  //connected...
  db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });  

module.exports = db;
  