const chai = require('chai');
const chaiHttp = require('chai-http');
const frisby = require('frisby');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/server');
const connectionMock = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  
  
  
  describe.skip('Quando o usuário é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      let newUser = {
        name: 'jane',
        email: 'tarzan@gmail.com',
        password: 'senha123',
      }

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

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

  describe.skip('Quando não existir o campo name', async () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

    it('Retorna o código de status 400', async () => {
      newUser = {
        email: 'tarzan@gmail.com',
        password: 'senha123',
      };

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
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

  describe.skip('Quando não existir o campo email', async () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

    it('Retorna o código de status 400', async () => {
      newUser = {
        name: 'jane',
        password: 'senha123',
      };

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
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

  describe.skip('Quando não existir o campo password', async () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

    it('Retorna o código de status 400', async () => {
      newUser = {
        name: 'jane',
        email: 'tarzan@gmail.com'
      };

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
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
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

    it('Retorna o código de status 409', async () => {
      let newUser2 = {
        name: 'jane',
        email: 'tarzan@gmail.com',
        password: 'senha123',
      }

      response = await chai.request(server)
        .post('/users')
        .send(newUser2);
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
    // let connectionMock;
    let db;
    // const DBServer = new MongoMemoryServer();

    // before(async () => {
    //   const URLMock = await DBServer.getUri();
    //   connectionMock = MongoClient.connect(URLMock, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
    //   db = connectionMock.db('Cookmaster');

    //   sinon.stub(MongoClient, 'connect')
    //     .resolves(connectionMock);
    // });

    before(async () => {
      const connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('Cookmaster');
    });


    beforeEach(async () => {
      await db.collection('users').deleteMany({});

      const userAdmin = {
        name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
      };

      await db.collection('users').insertOne(userAdmin);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

    it('verifica se retorna corretamente o usuário ADMIN cadastrado', async () => {
      const url = 'http://localhost:3000';
      let newLogin = { email: 'root@email.com', password: 'admin' };

      let newUser = {
        name: 'King Kong',
        email: 'kingkong@gmail.com',
        password: '123',
      }

      await frisby
        .post(`${ url }/login/`, newLogin)
        .expect('status', 200)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          return frisby.setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
            .post(`${ url }/users/admin`, newUser)
            .then((responseLogin) => {
              const { json } = responseLogin;
              console.log('json', json);

              expect(json).to.be.a('object');
              expect(json.user).to.have.property('name');
              expect(json.user.name).to.equal('King Kong');
              expect(json.user).to.have.property('email');
              expect(json.user.email).to.equal('kingkong@gmail.com');
              expect(json.user).to.have.property('role');
              expect(json.user.role).to.equal('admin');
              expect(json.user).to.have.property('_id');
              expect(json.user).not.to.have.property('password');
            });
        });
    });
  });
});

              // expect(json).to.have.property('message');
              // expect(json.message).to.equal('Email already registered');

