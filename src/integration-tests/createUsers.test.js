const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');

const { expect } = chai;

describe('POST /users', () => {
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

  it('Cadastra um novo usuário e retorna as informações do usuário com os campos obrigatórios', async () => {

    const newUser = {
      name: 'john',
      email: 'john@gmail.com',
      password: 'senha123',
    }

    const response = await chai.request(server)
      .post('/users')
      .send(newUser)
      .then((response) => response);

    expect(response).to.have.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body.user).to.have.property('name');
    expect(response.body.user.name).to.equal('john');
    expect(response.body.user).to.have.property('role');
    expect(response.body.user.role).to.equal('user');
    expect(response.body.user).to.have.property('email');
    expect(response.body.user.email).to.equal('john@gmail.com');
    expect(response.body.user).to.have.property('_id');
    expect(response.body.user).not.to.have.property('password');
  });

    it('Quando não existir o campo name, retorna mensagem de erro com o código de status 400', async () => {

      newUser = {
        email: 'tarzan@gmail.com',
        password: 'senha123',
      };

      const response = await chai.request(server)
        .post('/users')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Quando não existir o campo email, retorna mensagem de erro com o código de status 400', async () => {

      newUser = {
        name: 'jane',
        password: 'senha123',
      };

      const response = await chai.request(server)
        .post('/users')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Quando não existir o campo password, retorna mensagem de erro com o código de status 400', async () => {
      newUser = {
        name: 'jane',
        email: 'tarzan@gmail.com'
      };

      const response = await chai.request(server)
        .post('/users')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Quando o email já existir, retorna mensagem de erro com o código de status 409', async () => {
      let newUser = {
        name: 'jane',
        email: 'tarzan@gmail.com',
        password: 'senha123',
      }

      await db.collection('users').insertOne(newUser);
      
      const response = await chai.request(server)
        .post('/users')
        .send(newUser)
        .then((response) => response);
      
      expect(response).to.have.status(409);
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Email already registered');
    });

    it('Verifica se o usuário ADMIN é criado com sucesso e retorna corretamente o usuário ADMIN cadastrado com sucesso', async () => {

      const userAdmin = {
        name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
      };

      await db.collection('users').insertOne(userAdmin);

      const newLogin = { email: 'root@email.com', password: 'admin' };

      const user = {
        name: 'Mary',
        email: 'mary@gmail.com',
        password: '123',
      }

      const token = await chai.request(server)
        .post('/login')
        .send(newLogin)
        .then((response) => {
          const { body } = response;

          return body.token;
        })

      const { body } = await chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(user)
        .then((responseLogin) => responseLogin);

      expect(body).to.be.a('object');
      expect(body.user).to.have.property('name');
      expect(body.user.name).to.equal('Mary');
      expect(body.user).to.have.property('email');
      expect(body.user.email).to.equal('mary@gmail.com');
      expect(body.user).to.have.property('role');
      expect(body.user.role).to.equal('admin');
      expect(body.user).to.have.property('_id');
      expect(body.user).not.to.have.property('password');
    });

    it('verifica se retorna erro ao tentar cadastrar um novo admin, com usuário logado sem credenciais de admin', async () => {

      const user = {
        name: 'Maria', email: 'maria@email.com', password: 'user', role: 'user'
      };

      await db.collection('users').insertOne(user);

      let newLogin = { email: 'maria@email.com', password: 'user' };

      let newUser = {
        name: 'King Kong',
        email: 'kingkong@gmail.com',
        password: '123',
      }

      const token = await chai.request(server)
        .post('/login').send(newLogin)
        .then((response) => {
          const { body } = response;

          return body.token;
        })

      const { body } = await chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(newUser)
        .then((responseLogin) => responseLogin);

      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.equal('Only admins can register new admins');
    });
  });



