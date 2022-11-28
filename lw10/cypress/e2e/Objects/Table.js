class Table 
{
  tableCell(line, column) 
  {
    return cy.get(`tr:nth-child(${line}) > td:nth-child(${column})`);
  }

  totalProductPrice() 
  {
    return cy.get('td[colspan=4]')
  }
  
  tableOrdering() 
  {
    return cy.get('table.table-striped');
  }

}

export default Table