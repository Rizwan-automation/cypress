// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-mochawesome-reporter/register';
import 'cypress-file-upload';
import "cypress-localstorage-commands";
import { uniqueNamesGenerator, names } from "unique-names-generator";
require('cypress-downloadfile/lib/downloadFileCommand')
const moment = require('moment');
const mysql = require('mysql');
const TestRail = require('testrail-api');

Cypress.Commands.add("writeDataInFile", (path, nameof, value) => {
  cy.readFile(path).then((obj) => {
    const myName = nameof;
    const actualObj = obj;
    actualObj[myName] = value;
    cy.writeFile(path, actualObj);
  });
});

Cypress.Commands.add("createRandomEmail", () => {
  const CurrentDate = moment().unix();
  const emailId = `cypress-${CurrentDate}@yopmail.com`;
  return emailId;
});

Cypress.Commands.add("createRandomName", () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [names],
  });

  return shortName;
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'sonar-metrics.c87wxijx5ezi.us-east-1.rds.amazonaws.com',
  user: 'automation_user',
  password: 'kd2R:C)6BEfdAZ]}',
  database: 'sonardb',
});

// Custom Cypress command to execute MySQL queries
Cypress.Commands.add('queryDatabase', (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(query, params, (error, results) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
});

Cypress.Commands.add('addTestRailResult', (caseId, statusId) => {
  const testRail = new TestRail({
    host: 'https://rizwanpractice.testrail.io/',
    user: 'rizwan1993@gmail.com',
    password: 'Pakistan1!',
  });

  const runId = Cypress.env('TESTRAIL_RUN_ID');
  const projectId = Cypress.env('TESTRAIL_PROJECT_ID');

  const addResultForCase = testRail.addResultForCase(
    runId,
    caseId,
    statusId,
    {
      comment: `Automated test result by Cypress: ${statusId === 1 ? 'Passed' : 'Failed'}`,
    }
  );

  return addResultForCase;
});