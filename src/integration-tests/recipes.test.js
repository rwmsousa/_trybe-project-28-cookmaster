const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');

const { expect } = chai;

describe('POST /recipes', () => {
  let db;

  before(async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, 'connect')
      .resolves(connection);

    db = connection.db('Cookmaster')
    chai.use(chaiHttp);
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  afterEach(async () => {
    await db.collection('users').deleteMany({});
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('Verifica que é possível cadastrar nova receita', async () => {

    const newUser = {
      name: 'Tarzan',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    db.collection('users').insertOne(newUser);

    const newLogin = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    const token = await chai.request(server)
      .post('/login')
      .send(newLogin)
      .then((response) => {
        const { body } = response;

        return body.token;
      })

    const recipe = {
      name: "suco de maçã",
      ingredients: "maçã e água",
      preparation: "Bater tudo no liquidificador",
    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe)
      .then((response) => response);

    expect(response).to.have.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('recipe');
    expect(response.body.recipe).to.have.property('userId');
    expect(response.body.recipe).to.have.property('_id');
  });


  it('Verifica que busca todas as receitas', async () => {

    const newUser = {
      name: 'Tarzan',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    db.collection('users').insertOne(newUser);

    const newLogin = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    const token = await chai.request(server)
      .post('/login')
      .send(newLogin)
      .then((response) => {
        const { body } = response;

        return body.token;
      })

    const recipe = {
      name: "suco de maçã",
      ingredients: "maçã e água",
      preparation: "Bater tudo no liquidificador",
    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe)
      .then((response) => response);

    const recipes = await chai.request(server)
      .get('/recipes')
      .then((response) => response);

    expect(recipes.body.length).to.not.equal(0);
  });
});
