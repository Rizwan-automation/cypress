const { defineConfig } = require("cypress");
const mysql = require('mysql');

const connections = {
  stagingA: {
    host: 'https://localhost/',
    user: 'root',
    password: '123456789',
    database: 'cypress_test',
  }
}

// querying the database from Node
function queryDB(connectionInfo, query){
  const connection = mysql.createConnection(connectionInfo)
  connection.connect()
    return new Promise((resolve,reject)=>{
      connection.query(query,(error,results)=>{
        if(error) {
          return reject(error)
        }
        else {
          connection.end()
          return resolve(results)
        }
      })
    })
}
module.exports = defineConfig({
  video : false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://automationteststore.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        queryDatabase({ dbName, query }) {
          const connectionInfo = connections[dbName]
          if (!connectionInfo) {
            throw new Error(`Do not have DB connection under name ${dbName}`)
          }
          return queryDB(connectionInfo, query)
        }
      })
    },
  },
});
