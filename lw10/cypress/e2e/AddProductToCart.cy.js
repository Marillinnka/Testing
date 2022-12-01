import ModalWindow from "./Objects/ModalWindow";
import Search from "./Objects/Search";
import Table from "./Objects/Table";
import testData from "../fixtures/TestData.json";
import Functions from "./Objects/Functions";

describe('LUXURY WATCHES', () => 
{
  const functions = new Functions();
  const search = new Search();
  const modalWinow = new ModalWindow();
  const table = new Table();

  it('Добавление товара в корзину', () => 
  {
    functions.openSite(testData.baseUrl, 'macbook-11');

    cy.scrollTo(0, 350, { duration: 100 });

    functions.addWatchInCart(testData.watchSecond.name);

    functions.checkWatchInformation(testData.watchSecond.name, testData.watchSecond.price);

    cy.url().should('eq', testData.baseUrl + testData.cartUrl);

    functions.checkWatchInformationInCart(testData.watchSecond.name, testData.watchSecond.price);
  });
});