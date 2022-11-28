import ModalWindow from "./Objects/ModalWindow";
import Search from "./Objects/Search";
import Table from "./Objects/Table";
import testData from "../fixtures/TestData.json";

describe('LUXURY WATCHES', () => 
{
  const search = new Search();
  const modalWinow = new ModalWindow();
  const table = new Table();

  it('Добавление товара в корзину', () => 
  {
    cy.visit(testData.baseUrl);
    cy.url().should('eq', testData.baseUrl);
    cy.viewport('macbook-11');

    cy.scrollTo(0, 350, { duration: 100 });

    search.containerOfProduct().within(() => 
    {
      search.searchProductInContainer(testData.watchSecond.name).within(() => 
      {
      search.addProductToCart().click();
      });
    });

    modalWinow.modalWindowContent().within(() => 
    {
      table.tableCell(1, 2).contains(testData.watchSecond.name);
      table.tableCell(1, 4).contains(testData.watchSecond.price);
      table.totalProductPrice().contains(testData.watchSecond.price);
      modalWinow.modalFooter().within(() => 
      {
        modalWinow.makeOrderButton().click();
      });
    });

    cy.url().should('eq', testData.baseUrl + testData.cartUrl);

    table.tableOrdering().within(() => 
    {
      table.tableCell(1, 2).contains(testData.watchSecond.name);
      table.tableCell(1, 4).contains(testData.watchSecond.price);
      table.totalProductPrice().contains(testData.watchSecond.price);
    });
  });
});