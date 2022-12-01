import Home from './Home';
import ModalWindow from "./ModalWindow";
import Search from "./Search";
import Table from "./Table";
import Authorization from './Authorization';


class Functions 
{

    openSite(url, device) 
    {
      cy.visit(url);
      cy.url().should('eq', url);
      cy.viewport(device);
    }

    clickMenCategory()
    {
        const home = new Home();
        home.headerBottom().within(() => 
        {
            home.men().click();
        });
    }

    checkWatchInformation(name, price)
    {
      const modalWinow = new ModalWindow();
      const table = new Table();
      modalWinow.modalWindowContent().within(() => 
      {
        table.tableCell(1, 2).contains(name);
        table.tableCell(1, 4).contains(price);
        table.totalProductPrice().contains(price);
        modalWinow.modalFooter().within(() => 
        {
            modalWinow.makeOrderButton().click();
        });
      });
    }

    checkWatchInformationInCart(name, price)
    {
        const table = new Table();
        table.tableOrdering().within(() => 
        {
            table.tableCell(1, 2).contains(name);
            table.tableCell(1, 4).contains(price);
            table.totalProductPrice().contains(price);
        });
    }

    checkWatchInformationAndContinue(name, price)
    {
      const modalWindow = new ModalWindow();
      const table = new Table();
      modalWindow.modalWindowContent().within(() => 
    {
      table.tableCell(1, 2).contains(name);
      table.tableCell(1, 4).contains(price);
      table.totalProductPrice().contains(price);
      modalWindow.modalFooter().within(() => 
      {
        modalWindow.continueButton().click();
      });
    });
    }

    addWatchInCart(name)
    {
        const search = new Search();
        search.containerOfProduct().within(() => 
        {
            search.searchProductInContainer(name).within(() => 
            {
                search.addProductToCart().click();
            });
        });
    }

    accountLogin()
    {
        const home = new Home();
        home.topHeader().within(() => 
        {
            home.buttonAccount().click();
            home.buttonLogin().click();
        });
    }

    userAuthorization(login, password)
    {
        const authorization = new Authorization();
        authorization.authorizationForm().within(() => 
        {
            authorization.login().type(login);
            authorization.password().type(password);
            authorization.submitButton().click();
        });
    }
  
}

export default Functions