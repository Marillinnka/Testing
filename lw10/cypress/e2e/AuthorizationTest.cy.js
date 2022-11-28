import Home from './Objects/Home';
import Authorization from './Objects/Authorization';
import testData from "../fixtures/TestData.json";

describe('LUXURY WATCHES', () => 
{
  const home = new Home();
  const authorization = new Authorization();
  it('Авторизация', () => {

    cy.visit(testData.baseUrl);
    cy.url().should('eq', testData.baseUrl);
    cy.viewport('macbook-11');

    home.topHeader().within(() => 
    {
      home.buttonAccount().click();
      home.buttonLogin().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);

    authorization.authorizationForm().within(() => 
    {
      authorization.login().type(testData.userAutorization.login);
      authorization.password().type(testData.userAutorization.password);
      authorization.submitButton().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);
    cy.contains(testData.authorizationMessage);

  });
});
