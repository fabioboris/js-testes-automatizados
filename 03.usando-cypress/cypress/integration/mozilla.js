describe('Mozilla Developer', () => {

  beforeEach(() => {
    cy.visit('https://developer.mozilla.org');
  });

  it('Navegar pelo site', () => {
    cy.get('#technologies-button')
      .click();

    cy.get('ul.technologies')
      .contains('a', 'JavaScript')
      .click();

    cy.location('pathname')
      .should('contain', '/docs/Web/JavaScript');

    cy.get('h3#for_complete_beginners')
      .next()
      .contains('a', 'JavaScript first steps')
      .click();

    cy.location('pathname')
      .should('contain', '/docs/Learn/JavaScript/First_steps');

    cy.get('h2#guides')
      .next()
      .contains('a', 'Arrays')
      .click();

    cy.location('pathname')
      .should('contain', '/First_steps/Arrays');
  });

  it('Fazer uma busca', () => {
    cy.get('.header-search input[name="q"]')
      .type('arrays{enter}');

    cy.location('pathname')
      .should('contain', '/search');

    cy.get('main#content h1 span.query-string')
      .should('contain', 'arrays');

    cy.get('ul.search-results-list')
      .contains('mark', 'Arrays')
      .closest('a')
      .click();

    cy.location('pathname')
      .should('contain', '/First_steps/Arrays');
  });

  it('Tamanho da tela', () => {
    cy.viewport(1920, 1080);
    cy.wait(200);
    cy.screenshot();
    cy.get('nav.main-nav')
      .should('be.visible');
    cy.get('header.page-header button.main-menu-toggle')
      .should('not.be.visible');

    cy.viewport('iphone-6');
    cy.wait(200);
    cy.screenshot();
    cy.get('nav.main-nav')
      .should('not.be.visible');
    cy.get('header.page-header button.main-menu-toggle')
      .should('be.visible');
  });

  it('Propriedades gerais do documento', () => {
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8');
  });

});