describe('Race view ', function () {
  describe('Race container', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('front page can be opened and year 1990 races should be shown', function () {
      cy.get(
        '[cy-data="race-count"]'
      ).should('contain', 'Races: 16');
      cy.get('[cy-data="race-card"]').should('have.length', 16);
      cy.get('[cy-data="season-year"]').contains('1990');
    });
  });
  describe('Race info', () => {
    beforeEach(() => {
      cy.visit(
        '/seasons/2021/'
      );
      cy.get('[cy-data="race-card"]').eq(0).click();
    });
    it('Should see bahrain data and correct information', function () {
      cy.get('[cy-data="race-info-date"]').should('have.text','28/03/2021');
      cy.get('[cy-data="race-info-location"]').contains('Sakhir, Bahrain');
      cy.get('[cy-data="race-info-laps"]').contains('56');
      cy.get('[cy-data="race-info-weather"]').contains('21 C');
      cy.get('[cy-data="race-info-lap-length"]').contains('5.412 km');
    });
    it('Should see Lewis Hamiltons profile', function () {
      cy.contains('Lewis Hamilton').click();
      cy.url().should(
        'eq',
        'http://localhost:3000/drivers/61d83ccaef82c5e165a13a7c'
      );
    });
  });
});
