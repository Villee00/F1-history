describe('Driver container view', function () {
  beforeEach(() => {
    cy.visit('/drivers');
  });
  it('Driver name filter', function () {
    cy.get('#name').type('kimi');
    cy.get('form').submit();
    cy.get('[cy-data="driver-card"]').eq(0).get('[cy-data="driver-card"]').contains('Kimi Räikkönen');
  });
  it('Oldest mclaren driver', function () {
    cy.get('#mui-2').type('mclaren').type('{downarrow}').type('{enter}');
    cy.get('#mui-component-select-sort').click();
    cy.get('[data-value="age:asc"]').click();
    cy.get('form').submit();
    cy.get('[cy-data="driver-card"]').eq(0).get('[cy-data="driver-card"]').should('contain', 'John Watson');
  });
  it('Youngest driver driven on 2021 season', function () {
    cy.get('#year').type('2021');
    cy.get('#mui-component-select-sort').click();
    cy.get('[data-value="age:desc"]').click();
    cy.get('form').submit();
    cy.contains('Yuki Tsunoda');
  });
  it('Finnish driver on that drove for Ferrari or Mercedes', function () {
    cy.get('#nationality').type('Fin');
    cy.get('#mui-2').type('mercedes').type('{downarrow}').type('{enter}');
    cy.get('#mui-2').type('ferrari').type('{downarrow}').type('{enter}');

    cy.get('form').submit();
    cy.contains('Kimi Räikkönen');
    cy.contains('Valtteri Bottas');
  });
});

describe('Driver info page', function () {
  beforeEach(() => {
    cy.visit('/drivers/61d83cc9ef82c5e165a13a70');
  });
  it('Name should be visible', function () {
    cy.get('[cy-data="driver-info-birthday"]').should('contain.text', '16/10/1997');
    cy.get('[cy-data="driver-info-nationality"]').should('contain.text', 'Monegasque');
    cy.get('[cy-data="driver-info-races-amount"]').should('contain.text', '81');
    cy.get('[cy-data="driver-info-positions-gained"]').should('contain.text', '-78');
  });
  it('Should see the drivers races', function () {
    cy.get('[cy-data="races-count"]').should('contain.text', '81 races');
    cy.get('[cy-data="driver-grand-prix"]').eq(0).should('contain.text', '2020 Austrian Grand Prix');
  });

  it('Should have correct link to wikipedia and to picture credits', function () {
    cy.get('[cy-data="driver-info-wikipedia-link"]').should('have.attr', 'href').and('include', 'http://en.wikipedia.org/wiki/Charles_Leclerc');
    cy.get('[cy-data="driver-info-picture-author"] > a').should('have.attr', 'href').and('include', 'http://commons.wikimedia.org/wiki/User:Gilzetbase');
    cy.get('[cy-data="driver-info-picture-source"] > a').should('have.attr', 'href').and('include', 'http://commons.wikimedia.org/wiki/User:Gilzetbase');
    cy.get('[cy-data="driver-info-picture-wikimedia-commons"] > a').should('have.attr', 'href').and('include', 'http://commons.wikimedia.org/wiki/File:Charles-Leclerc.jpg');
    cy.get('[cy-data="driver-info-picture-license-info"] > a').should('have.attr', 'href').and('include', 'https://creativecommons.org/licenses/by-sa/4.0/');
  });
});
