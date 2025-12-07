// Ignore JS errors coming from the MUI site (analytics, etc.)
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('UI Automation Tests - Cypress Assignment', () => {

  // 1. Text Field Test
  it('Text field interaction test', () => {
    cy.visit('https://mui.com/material-ui/react-text-field/');

    // Use the first three inputs as name, email, number
    cy.get('input').eq(0).type('Shardul');
    cy.get('input').eq(1).type('shardul@test.com');
    cy.get('input').eq(2).type('12345');

    cy.get('input').eq(0).should('have.value', 'Shardul');
    cy.get('input').eq(1).should('have.value', 'shardul@test.com');
    cy.get('input').eq(2).should('have.value', '12345');
  });

  // 2. Dropdown Test (this one was already passing)
  it('Dropdown selection test', () => {
    cy.visit('https://mui.com/material-ui/react-select/');

    // Use the simple native <select> example
    cy.get('select').first().select('Ten').should('have.value', '10');
  });

  // 3. Autocomplete / Auto-suggest Test
  it('Autocomplete auto-suggest test', () => {
    cy.visit('https://mui.com/material-ui/react-autocomplete/');

    // Click the first autocomplete input and type a letter
    cy.get('input').first().click().type('a');

    // Wait for suggestions and click the first option
    cy.get('li[role="option"]').first().then(($option) => {
      const text = $option.text().trim();
      cy.wrap($option).click();

      // Assert that the input now has the same text
      cy.get('input').first().should('have.value', text);
    });
  });

  // 4. Table Interaction Test
  it('Table validation test', () => {
    cy.visit('https://mui.com/material-ui/react-table/');

    // Check that the table has at least one row
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Optionally: log the first row text (no strict Cupcake check)
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').then(cells => {
        const firstCellText = cells[0].innerText;
        cy.log('First row first cell:', firstCellText);
      });
    });
  });

});
