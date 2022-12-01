import Home from "./Objects/Home";
import Search from "./Objects/Search";
import Authorization from "./Objects/Authorization";
import ModalWindow from "./Objects/ModalWindow";
import Table from "./Objects/Table";
import Order from "./Objects/Order";
import testData from "../fixtures/TestData.json";
import Functions from "./Objects/Functions";

describe('LUXURY WATCHES', () => 
{
  const functions = new Functions();
  const home = new Home();
  const search = new Search();
  const authorization = new Authorization();
  const modalWindow = new ModalWindow();
  const table = new Table();
  const order = new Order();

  it('Оформление заказа', () => 
  {
    cy.visit(testData.baseUrl);
    cy.url().should('eq', testData.baseUrl);
    cy.viewport('macbook-13');

    home.headerBottom().within(() => {
      home.chooseMenWatch().invoke('show');
      home.chooseCitizenWatch().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.citizenWatchUrl);

    functions.addWatchInCart(testData.watchThird.name);

    functions.checkWatchInformation(testData.watchThird.name, testData.watchThird.price);

    cy.url().should('eq', testData.cartUrl);

    functions.checkWatchInformationInCart(testData.watchThird.name, testData.watchThird.price);

    cy.scrollTo(0, 350, { duration: 100 });

    authorization.authorizationForm().within(() => 
    {
      authorization.login().type(testData.newUserAuthorization.login);
      authorization.password().type(testData.newUserAuthorization.password);
      authorization.name().type(testData.newUserAuthorization.name);
      authorization.email().type(testData.newUserAuthorization.email);
      authorization.address().type(testData.newUserAuthorization.address);
      order.noteTextarea().type(testData.newUserAuthorization.note);
      authorization.submitButton().click();
    });

  cy.contains(testData.messageAfterCreateOrder);
  });
});