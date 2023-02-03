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
          name: 'View all Departments',
          value: 'VIEW_DEPARTMENTS',
        },
        {
          name: 'Add a Department',
          value: 'ADD_DEPARTMENT',
        },

        {
          name: 'Update Employee Role',
          value: 'UPDATE_EMPLOYEE_ROLE',
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
      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole()
        break

      default:
        break
    }
  })
}

function viewDepartments() {
  queries
    .viewDepartments()
    .then(([rows, fields]) => {
      console.table(rows)
    })

    .then(() => {
      loadInitialQuestions()
    })
}




function updateEmployeeRole() {
  queries
    .viewEmployees()
    .then(([employees]) => {
      const employeeArray = employees.map(({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        }
      })
      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employees role would you like to update?',
          choices: employeeArray,
        },
      ])
      console.table(employees)
    })
    .then(({ employeeId }) => {
      queries.viewRoles().then(([roles]) => {
        const rolesArray = roles.map(({ id, title }) => {
          return {
            name: title,
            value: id,
          }
        })
        prompt([
          {
            type: 'list',
            name: 'rolesId',
            message: 'Which role would you like to update the employee to?',
            choices: rolesArray,
          },
        ]).then(({ rolesId }) => {
          queries
            .updateEmployeerole(employeeId, rolesId)
            .then(() => console.log('Updated Employees Role'))
            .then(() => {
              loadInitialQuestions()
            })
        })
      })
    })
}
