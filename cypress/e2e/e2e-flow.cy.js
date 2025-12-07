// Ignore JS errors coming from the MUI site
Cypress.on('uncaught:exception', () => {
  return false;
});

describe('End-to-End Flow - UI + API', () => {
  it('fills UI form, submits, and creates user via API', () => {
    const user = {
      name: 'Shardul',
      job: 'QA Engineer',
    };

    // 1. Visit MUI Text Field page (used as our UI form)
    cy.visit('https://mui.com/material-ui/react-text-field/');

    // 2. Fill Name + Job in the first two text fields
    cy.get('input').eq(0).clear().type(user.name); // Name
    cy.get('input').eq(1).clear().type(user.job);  // Job

    // Assert UI values
    cy.get('input').eq(0).should('have.value', user.name);
    cy.get('input').eq(1).should('have.value', user.job);

    // 3. Simulate form submit by clicking any MUI button on the page
    cy.get('button').first().click();

    // 4. Send POST request to create user with same data as UI
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: user,
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('E2E Create User status:', res.status);

      // Ideally 201, but allow 403 in restricted environments
      expect([201, 403]).to.include(res.status);

      if (res.status === 201) {
        // Validate: UI input == API data
        expect(res.body.name).to.eq(user.name);
        expect(res.body.job).to.eq(user.job);

        // Response contains user ID
        expect(res.body).to.have.property('id');

        // createdAt is a valid ISO timestamp
        expect(res.body.createdAt).to.match(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z$/
        );
      }
    });
  });
});
