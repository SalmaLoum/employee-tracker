const mysql = require('mysql2')

const connection = mysql.createConnection(
  {
    host: 'localhost',
    passwrod: 'ucla1234',
    database: 'employees',
  },
  console.log('connected to employees_db database'),
)

module.export = connection
