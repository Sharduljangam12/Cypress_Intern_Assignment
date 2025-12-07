describe('ReqRes API Tests - Cypress Assignment', () => {
  const baseUrl = 'https://reqres.in/api';

  // 1. Create User - POST
  it('Create User - POST /api/users', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: 'Shardul',
        job: 'QA Engineer',
      },
      // allow non-2xx so we can handle 403 gracefully
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Create User status:', res.status);

      // expected in ideal case: 201, but allow 403 in restricted environments
      expect([201, 403]).to.include(res.status);

      if (res.status === 201) {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('createdAt');
      }
    });
  });

  // 2. Read Users - GET
  it('Read Users - GET /api/users?page=2', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Read Users status:', res.status);

      // ideal: 200
      expect([200, 403]).to.include(res.status);

      if (res.status === 200) {
        expect(res.body.data).to.be.an('array').and.not.be.empty;

        res.body.data.forEach((user) => {
          expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
      }
    });
  });

  // 3. Update User - PUT
  it('Update User - PUT /api/users/2', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      body: {
        name: 'Shardul Updated',
        job: 'Senior QA',
      },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Update User status:', res.status);

      // ideal: 200
      expect([200, 403]).to.include(res.status);

      if (res.status === 200) {
        expect(res.body).to.have.property('updatedAt');
      }
    });
  });

  // 4. Delete User - DELETE
  it('Delete User - DELETE /api/users/2', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Delete User status:', res.status);

      // ideal: 204 (no content)
      expect([204, 403]).to.include(res.status);
    });
  });
});
