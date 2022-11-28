import Home from "./Objects/Home";
import Search from "./Objects/Search";
import Authorization from "./Objects/Authorization";
import ModalWindow from "./Objects/ModalWindow";
import Table from "./Objects/Table";
import Order from "./Objects/Order";
import testData from "../fixtures/TestData.json";

describe('LUXURY WATCHES', () => 
{
  const home = new Home();
  const search = new Search();
  const authorization = new Authorization();
  const modalWindow = new ModalWindow();
  const table = new Table();
  const order = new Order();
  const userLogin = Date.now().toString();

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

    search.containerOfProduct().within(() => 
    {
      search.searchProductInContainer(testData.watchThird.name).within(() => 
      {
        search.addProductToCart().click();
      });
    });

    modalWindow.modalWindowContent().within(() => 
    {
      table.tableCell(1, 2).contains(testData.watchThird.name);
      table.tableCell(1, 4).contains(testData.watchThird.price);
      table.totalProductPrice().contains(testData.watchThird.price);
      modalWindow.modalFooter().within(() => 
      {
        modalWindow.makeOrderButton().click();
      });
    });

    cy.url().should('eq', testData.cartUrl);

    table.tableOrdering().within(() => 
    {
      table.tableCell(1, 2).contains(testData.watchThird.name);
      table.tableCell(1, 4).contains(testData.watchThird.price);
      table.totalProductPrice().contains(testData.watchThird.price);
    });

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