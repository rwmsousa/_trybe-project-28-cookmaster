const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /recipes', () => {
 
   let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    let newLogin = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

  let response = {};
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const   URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send(newUser);

    logged = await chai.request(server)
      .post('/login')
      .send(newLogin);
  });

  after(async () => {
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  it('Verifica que é possível cadastrar nova receita', async () => {
    const recipe = {
      name: "suco de maçã",
      ingredients: "maçã e água",
      preparation: "Bater tudo no liquidificador",
    };

    const { token } = logged.body;

    response = await chai.request(server)
    .post('/recipes')
    .set('authorization', token)
    .send(recipe);
  })

  it('Retorna status 201', () => {
    expect(response).to.have.status(201);
  });

  it('Retorna um objeto', () => {
    expect(response.body).to.be.a('object');
  });

  it('Dentro do objeto existe uma propriedade "recipe"', () => {
    expect(response.body).to.have.property('recipe');
  });

  it('Dentro da propriedade "recipe" existe uma propriedade "userId"', () => {
    expect(response.body.recipe).to.have.property('userId');
  });

  it('Dentro da propriedade "recipe" existe uma propriedade "_id"', () => {
    expect(response.body.recipe).to.have.property('_id');
  });
});

describe('GET /recipes', () => {
  let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    let newLogin = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

  const recipe = {
    name: "suco de maçã",
    ingredients: "maçã e água",
    preparation: "Bater tudo no liquidificador",
  };

  let response = {};
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const   URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send(newUser);

    logged = await chai.request(server)
      .post('/login')
      .send(newLogin);


    const { token } = logged.body;

    await chai.request(server)
    .post('/recipes')
    .set('authorization', token)
    .send(recipe);

    response = await chai.request(server)
      .get('/recipes');
  });

  after(async () => {
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  it('Verifica que busca todas as receitas', () => {
    expect(response.body.length).to.not.equal(0);
  });
});
 