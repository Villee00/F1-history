describe('Driver view', function () {
  beforeEach(() => {
    cy.visit('/drivers');
  });
  it('Driver name filter', function () {
    cy.get('#name').type('kimi');
    cy.get('form').submit();
    cy.contains('Kimi Räikkönen');
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
