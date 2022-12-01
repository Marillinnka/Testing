class Home 
{
  topHeader() 
  {
    return cy.get('.top-header');
  }

  buttonAccount() 
  {
    return cy.get('a').contains('Account');
  }

  buttonLogin() 
  {
    return cy.get('.dropdown-menu').contains('Вход');
  }



  searchForm() 
  {
    return cy.get('form[action=search]');
  }

  searchInput() 
  {
    return cy.get('input[id=typeahead]');
  }

  searchList() 
  {
    return cy.get('.tt-dataset-products');
  }

  headerBottom() 
  {
    return cy.get('.header-bottom');
  }

  men() 
  {
    return cy.get('.menu-dropdown-icon').contains('Men');
  }

  chooseMenWatch() 
  {
    return this.men().next();
  }

  chooseCitizenWatch() 
  {
    return this.chooseMenWatch().contains('Citizen');
  }

 

  buttonValuta() 
  {
    return cy.get('span[class=selected]');
  }

  buttonEUR() 
  {
    return cy.get('li').contains('EUR');
  }

  women() 
  {
    return cy.get('.menu-dropdown-icon').contains('Women');
  }

  buttonCart() 
  {
    return cy.get('a[href="cart/show"]');
  }

  buttonExit() 
  {
    return cy.get('a[href="user/logout"]');
  }
}

export default Home