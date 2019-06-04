const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'payment'
});

mysqlConnection.connect((err) => {
  if (!err)
    console.log('DB connection OK');
  else
    console.log('DB connection error' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
