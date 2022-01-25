const chai = require('chai');
const chaiHttp = require('chai-http');
const frisby = require('frisby');
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

  describe('Quando o usuário é criado com sucesso', async () => {
    let response = {};

    let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    before(async () => {

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
    })

    it('verifica se retorna o código 201', async () => {
      expect(response).to.have.status(201);
    });

    it('verifica se retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
      expect(response.body.user.name).to.equal('jane');
    });

    it('o objeto possui a propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
      expect(response.body.user.email).to.equal('tarzan@gmail.com');
    });

    it('o objeto possui a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
      expect(response.body.user.role).to.equal('user');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('o objeto não possui a propriedade "password"', () => {
      expect(response.body.user).not.to.have.property('password');
    });
  });

  describe('Quando não existir o campo name', async () => {
    let response = {};

    newUser = {
      email: 'tarzan@gmail.com',
      password: 'senha123',
    };

    response = await chai.request(server)
      .post('/users')
      .send(newUser);

    it('Retorna o código de status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Existe uma mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando não existir o campo email', async () => {
    let response = {};

    newUser = {
      name: 'jane',
      password: 'senha123',
    };

    response = await chai.request(server)
      .post('/users')
      .send(newUser);

    it('Retorna o código de status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Existe uma mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando não existir o campo password', async () => {
    let response = {};

    newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com'
    };

    response = await chai.request(server)
      .post('/users')
      .send(newUser);

    it('Retorna o código de status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Existe uma mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando o email já existir', async () => {
    let response = {};

    let newUser = {
      name: 'jane',
      email: 'tarzan@gmail.com',
      password: 'senha123',
    }

    response = await chai.request(server)
      .post('/users')
      .send(newUser);

    it('Retorna o código de status 409', async () => {
      expect(response).to.have.status(409);
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Existe uma mensagem "Email already exists."', () => {
      expect(response.body.message).to.equal('Email already registered');
    });
  });

  describe('Quando o usuário ADMIN é criado com sucesso', () => {

    it('verifica se retorna corretamente o usuário ADMIN cadastrado com sucesso', async () => {

      const userAdmin = {
        name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
      };

      await db.collection('users').insertOne(userAdmin);

      let newLogin = { email: 'root@email.com', password: 'admin' };

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

      chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(newUser)
        .then((responseLogin) => {
          const { body } = responseLogin;

          expect(body).to.be.a('object');
          expect(body.user).to.have.property('name');
          expect(body.user.name).to.equal('King Kong');
          expect(body.user).to.have.property('email');
          expect(body.user.email).to.equal('kingkong@gmail.com');
          expect(body.user).to.have.property('role');
          expect(body.user.role).to.equal('admin');
          expect(body.user).to.have.property('_id');
          expect(body.user).not.to.have.property('password');
        });
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
          console.log('body', body);

          return body.token;
        })

      chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(newUser)
        .then((responseLogin) => {
          console.log('responseLogin', responseLogin);
          const { body } = responseLogin;

          expect(body).to.be.a('object');
          expect(body).to.have.property('message');
          expect(body.message).to.equal('Only admins can register new admins');
        });
    });
  });
});



