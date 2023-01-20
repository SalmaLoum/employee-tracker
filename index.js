const mysql = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')
//const { prototype } = require('events');
const queries = require('./db/Queries')

init
function init() {
  loadInitialQuestions()
}

function loadInitialQuestions() {
  prompt([
    {
      type: 'list',
      name: 'action',
      massage: 'What would you like to do?',
      choices: [
        {
          name: 'View all departments',
          value: 'VIEW_DEPARTMENTS',
        },
        {
          name: 'add a department',
          value: 'ADD_DEPARTMENT',
        },
      ],
    },
  ]).then((choice) => {
    let response = choice.action

    switch (response) {
      case 'VIEW_DEPARTMENTS':
        viewDepartments()
        break
      case 'ADD_DEPARTMENT':
        addDepartment()
        break

      default:
        break
    }
  })
}

function viewDepartments() {
  queries.viewDepartments().then(([rows, fields]) => {
    console.table(rows)
  })
}
