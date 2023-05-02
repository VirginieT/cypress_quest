describe('Verify that responses conform to specifications', () => {
  it('should return HTTP 200 for POST /notes', () => {
    cy.request({
      method: 'POST',
      url: 'https://practice.expandtesting.com/notes/api/notes',
      body: {
        title: 'Test Note',
        content: 'This is a test note'
      }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('notes')
      expect(response.body.notes).to.be.an('array')
    })
  })
})


describe('Verify that the API handles errors correctly', () => {
  it('should return HTTP 400 for POST /notes with invalid body', () => {
    cy.request({
      method: 'POST',
      url: 'https://practice.expandtesting.com/notes/api/notes',
      body: {
        invalidKey: 'This is not a valid note'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400)
    })
  })

  it('should return HTTP 404 for GET /notes/{id} when note does not exist', () => {
    cy.request({
      method: 'GET',
      url: 'https://practice.expandtesting.com/notes/api/notes/9999'
    }).then(response => {
      expect(response.status).to.eq(404)
    })
  })
})


describe('Create Note', () => {
  const testData = require('../fixtures/quete3.json')

  testData.forEach((data) => {
    it(`should create a new note with title "${data.title}" and content "${data.content}"`, () => {
      cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        body: data
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.title).to.eq(data.title)
        expect(response.body.content).to.eq(data.content)
      })
    })
  })
})



