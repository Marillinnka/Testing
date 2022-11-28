import Home from './Objects/Home';
import Search from './Objects/Search';
import testData from "../fixtures/TestData.json";

describe('LUXURY WATCHES', () => 
{

  const home = new Home();
  const search = new Search();

  it('Поиск товара', () => 
  {
    cy.visit(testData.baseUrl);
    cy.url().should('eq', testData.baseUrl);
    cy.viewport('macbook-11');

    home.searchForm().within(() => 
    {
      home.searchInput().type(testData.searchData);
      home.searchList().contains(testData.watchFirst.name).click();
    });

    cy.url().should('eq', testData.baseUrl + testData.searchRoyalLondonUrl);
    search.breadcrumb().contains(testData.searchNotification);

    home.headerBottom().within(() => 
    {
    home.men().click();
    });

    cy.url().should('eq', testData.baseUrl + testData.menUrl);
    cy.scrollTo(0, 350, { duration: 100 });
    search.containerOfProduct().within(() => 
    {
      search.searchProductInContainer(testData.watchSecond.name).within(() => 
      {
      search.clickProductInContainer().click();
      });
    });
    search.singlePara().contains(testData.watchSecond.name);
  });
});