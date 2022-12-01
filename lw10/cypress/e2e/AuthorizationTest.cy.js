import Home from './Objects/Home';
import Authorization from './Objects/Authorization';
import testData from "../fixtures/TestData.json";
import Functions from "./Objects/Functions";
import { func } from 'assert-plus';

describe('LUXURY WATCHES', () => 
{
  const home = new Home();
  const authorization = new Authorization();
  const functions = new Functions();

  it('Авторизация', () => {

    functions.openSite(testData.baseUrl, 'macbook-11');

    functions.accountLogin();

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);

    functions.userAuthorization(testData.userAutorization.login, testData.userAutorization.password);

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);
    cy.contains(testData.authorizationMessage);

  });
});
