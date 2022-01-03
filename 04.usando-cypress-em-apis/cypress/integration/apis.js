describe('ViaCEP', () => {

  it('Consultar o CEP de Santa Fé do Sul', () => {
    cy.request('http://viacep.com.br/ws/15775000/json/')
      .should(result => {
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('localidade');
        expect(result.body.localidade).to.equal('Santa Fé do Sul');

        // Fazer log do estado na tela do teste
        cy.log(result.body.uf);

        // Fazer a verificação de vários atributos
        // expect(result.body).contain({
        //   localidade: 'Santa Fé do Sul',
        //   uf: 'SP'
        // });
      });
  });

  it('Consultar um CEP inválido', () => {
    cy.request('http://viacep.com.br/ws/15775001/json/')
      .should(result => {
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('erro');
      });
  });

});

describe('JSON Placeholder', () => {

  it('Consultar um usuário inexistente', () => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/users/999999',
      failOnStatusCode: false
    }).should(result => {
      expect(result.status).to.equal(404);
    });
  });

  it('Enviar uma requisição POST para criar uma postagem', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
      title: 'Este é o título da postagem',
      body: 'E este é o conteúdo da postagem',
      userId: 1
    }).then(result => {
      expect(result.status).to.equal(201);
      expect(result.body.userId).to.equal(1);
    });
  });

  it('Criar uma postagem com dados de um usuário obtido', () => {
    cy.request('https://jsonplaceholder.typicode.com/users/1')
      .should(result => {
        expect(result.status).to.equal(200);
      }).its('body').then(user => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
          title: 'Este é o título da postagem',
          body: 'E este é o conteúdo da postagem',
          userId: user.id
        }).then(result => {
          expect(result.status).to.equal(201);
          expect(result.body.userId).to.equal(user.id);
        });
      });
  });

});