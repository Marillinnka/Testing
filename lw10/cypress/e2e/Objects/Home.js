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

}

export default Home