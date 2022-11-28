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
}

export default ModalWindow