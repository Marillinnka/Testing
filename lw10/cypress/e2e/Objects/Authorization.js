class Authorization
{
  authorizationForm() 
  {
    return cy.get('form');
  }

  login() 
  {
    return cy.get('input[name=login]');
  }

  password() 
  {
    return cy.get('input[name=password]');
  }

  submitButton() 
  {
    return cy.get('button[type=submit]');
  }

  name() 
  {
    return cy.get('input[name=name]');
  }

  email() 
  {
    return cy.get('input[name=email]');
  }

  address() 
  {
    return cy.get('input[name=address]');
  }
}

export default Authorization