describe('User tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  describe('Login form', () => {
    it('Login successful', () => {
      cy.get('#username').type('ville');
      cy.get('#password').type('123456');
      cy.get('form').submit();
      cy.contains('Login successful!');
    });
    it('Login failed', () => {
      cy.get('#username').type('ville');
      cy.get('#password').type('fail');
      cy.get('form').submit();
      cy.contains('Invalid username or password');
    });
  });

  describe('Sign up form', () => {
    beforeEach(() => {
      cy.contains('Sign up').click();
    });
    it('Sign up form validation', () => {
      cy.get('#name').type('failed');
      cy.get('#username').type('ville');
      cy.get('#password').type('123456');
      cy.get('#passwordConfirm').type('1234565');
      cy.get('form').submit();
      cy.contains('Passwords must match');
    });
    it('Sign up username taken', () => {
      cy.get('#name').type('failed');
      cy.get('#username').type('ville');
      cy.get('#password').type('123456');
      cy.get('#passwordConfirm').type('123456');
      cy.get('form').submit();
      cy.contains('That username already exists, please choose another one.');
    });
  });

  describe('User', () => {
    beforeEach(() => {
      cy.get('#username').type('ville');
      cy.get('#password').type('123456');
      cy.get('form').submit();
      cy.contains('Login successful!');
    });
    it('Menu links to users profile', () => {
      cy.get('#menuBtn').click();
      cy.get('#profileUserBtn').click();
      cy.url().should('include', '/ville');
      cy.contains('Favorite Races');
    });
    it('Logout', () => {
      cy.get('#menuBtn').click();
      cy.get('#logoutBtn').click();
      cy.contains('Logout successfully');
    });
  });
});
