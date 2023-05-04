let authToken;

describe('API Tests', () => {
  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://practice.expandtesting.com/notes/api/users/login',
      headers: {
        accept: "application/json",
      },
      body: {
        email: 'swagger@gmail.com',
        password: 'swagger'
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should create a new note', () => {
    const testData = {
      title: 'Test Note',
      description: 'This is a test note',
      category: 'Home'
    };
      cy.request({
        authToken: authToken,
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        headers: {
          accept: "application/json",
        },
        body: testData,
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.title).to.eq(testData.title);
        expect(response.body.data.description).to.eq(testData.description);
        expect(response.body.data.category).to.eq(testData.category);
      });
});

  it('should get all notes', () => {
      cy.request({
        method: 'GET',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        headers: {
          accept: "application/json",
        },
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
      });
    });
});