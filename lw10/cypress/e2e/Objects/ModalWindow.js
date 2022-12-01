class ModalWindow 
{
  modalWindowContent() 
  {
    return cy.get('.modal-content');
  }

  makeOrderButton() 
  {
    return cy.get('a[type=button]')
  }

  modalFooter() 
  {
    return cy.get('.modal-footer')
  }



  continueButton() 
  {
    return cy.get('button').contains('Продолжить покупки')
  }

  cleanCartButton() 
  {
    return cy.get('button').contains('Очистить корзину')
  }

  modalBody() 
  {
    return cy.get('.modal-body');
  }

  cleaningCart() 
  {
    return cy.get('h3')
  }

  modalHeader() 
  {
    return cy.get('.modal-header')
  }

  closeButton() 
  {
    return cy.get('span[aria-hidden="true"]')
  }

}

export default ModalWindow