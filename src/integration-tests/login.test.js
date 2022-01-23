
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {

  describe('Quando faz o login com sucesso', () => {

    let newUser = {
      name: 'jane',
      email: 'jane@gmail.com',
      password: 'senha123',
    }

    let newLogin = {
      email: 'jane@gmail.com',
      password: 'senha123',
    }

    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send(newUser);

      response = await chai.request(server)
        .post('/login')
        .send(newLogin);
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop(); 
    });

    it('Recebe um status 200', async () => {
      expect(response).to.have.status(200)
    });
    
    it('Existe uma propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });
});