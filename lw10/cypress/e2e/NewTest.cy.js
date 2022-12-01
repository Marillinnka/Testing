import Home from './Objects/Home';
import Search from './Objects/Search';
import testData from "../fixtures/TestData.json";
import Authorization from './Objects/Authorization';
import ModalWindow from "./Objects/ModalWindow";
import Table from "./Objects/Table";
import Order from "./Objects/Order";
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

  it('Поиск товара', () => 
  {
    functions.openSite(testData.baseUrl, 'macbook-11');

    functions.accountLogin();

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);

    functions.userAuthorization(testData.userAutorization.login, testData.userAutorization.password);

    cy.url().should('eq', testData.baseUrl + testData.loginUrl);
    cy.contains(testData.authorizationMessage);

    home.topHeader().within(() => 
    {
      home.buttonValuta().click();
      home.buttonEUR().click();
    });



    home.headerBottom().within(() => 
    {
      home.women().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.womenUrl);


    functions.addWatchInCart(testData.womenWatch.name);

    functions.checkWatchInformationAndContinue(testData.womenWatch.name,testData.womenWatch.price);

    functions.addWatchInCart(testData.womenWatch.name);

    functions.checkWatchInformationAndContinue(testData.womenWatch.name,testData.womenWatch.price);

    home.topHeader().within(() => 
    {
      home.buttonCart().click();
    });

    modalWindow.modalFooter().within(() => 
    {
      modalWindow.cleanCartButton().click();
    });

    modalWindow.modalBody().contains(testData.cleanCartMessage);

    modalWindow.modalHeader().within(() => 
    {
      modalWindow.closeButton().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.womenUrl);

    functions.clickMenCategory();

    functions.addWatchInCart(testData.newWatch.name);

    functions.checkWatchInformation(testData.newWatch.name, testData.newWatch.price);

    cy.url().should('eq', testData.cartUrl);

    functions.checkWatchInformationInCart(testData.newWatch.name, testData.newWatch.price);

    authorization.authorizationForm().within(() => 
    {
      order.noteTextarea().type(testData.newUserAuthorization.note);
      authorization.submitButton().click();
    });
    cy.contains(testData.messageAfterCreateOrder);

    home.topHeader().within(() => 
    {
      home.buttonAccount().click();
      home.buttonExit().click();
    });

    home.topHeader().within(() => 
    {
      home.buttonAccount().click();
    });
  });
});