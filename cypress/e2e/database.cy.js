describe('Task 3', () => {

    it.skip('Database test', function() {
        const dbName = 'stagingA'
        const query = 'SELECT * FROM persons'

        cy.task('queryDatabase', { dbName, query })
          });
    })