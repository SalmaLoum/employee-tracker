const mysql = require('mysql2')

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    passwrod: 'ucla1234',
    database: 'employees_db',
  },
  console.log('connected to employees_db database'),
)

module.export = connection;
