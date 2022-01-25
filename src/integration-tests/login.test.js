const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');

const { expect } = chai;

describe('POST /login', () => {
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

  it('Quando faz o login com sucesso', async() => {

    let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    let newLogin = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    await chai.request(server)
      .post('/users')
      .send(newUser);

    const response = await chai.request(server)
      .post('/login')
      .send(newLogin);

    expect(response).to.have.status(200)
    expect(response.body).to.have.property('token');
  });

  it('Quando algum campo não é informado e não faz o login com sucesso', async() => {

    let newLogin = {
      email: 'jane',
      password: 'senha123',
    }

    await chai.request(server)
      .post('/users')
      .send(newUser);

    const response = await chai.request(server)
      .post('/login')
      .send(newLogin);

    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal('All fields must be filled');
  });

  it('Quando os campos e-mail ou senha estão incorretos', async() => {

    let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    let newLogin = {
      email: 'jacare@gmail.com',
      password: 'correee',
    }

    await chai.request(server)
      .post('/users')
      .send(newUser);

    const response = await chai.request(server)
      .post('/login')
      .send(newLogin);

    expect(response).to.have.status(401);
    expect(response.body.message).to.equal('Incorrect username or password');
  });
});