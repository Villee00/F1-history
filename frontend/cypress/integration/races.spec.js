describe('Race view ', function () {
  describe('Race container', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('front page can be opened', function () {
      cy.get(
        ':nth-child(1) > .MuiButtonBase-root > .MuiBox-root > .MuiCardMedia-root'
      ).click();
      cy.contains('11/03/1990');
      cy.contains('1990');
    });
  });
  describe('Race info', () => {
    beforeEach(() => {
      cy.visit(
        'http://localhost:3000/seasons/2021/2021%20Bahrain%20Grand%20Prix'
      );
    });
    it('Race data is correct', function () {
      cy.contains('28/03/2021');
      cy.contains('Sakhir, Bahrain');
      cy.contains('56');
      cy.contains('21 C');
      cy.contains('5.412 km');
    });
    it('Race table', function () {
      cy.contains('Lewis Hamilton').click();
      cy.url().should(
        'eq',
        'http://localhost:3000/drivers/61d83ccaef82c5e165a13a7c'
      );
    });
  });
});
