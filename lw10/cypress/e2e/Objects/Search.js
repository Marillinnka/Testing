class Search 
{

  containerOfProduct() 
  {
    return cy.get('.product-one');
  }

  breadcrumb() 
  {
    return cy.get('.breadcrumb');
  }

  addProductToCart() 
  {
    return cy.get('.add-to-cart-link');
  }

  searchProductInContainer(name) 
  {
    return cy.get(`.product-main:contains("${name}")`);
  }

  clickProductInContainer() 
  {
    return cy.get('a[class=mask]');
  }

  singlePara() 
  {
    return cy.get('.single-para');
  }

}

export default Search