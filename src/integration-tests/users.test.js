const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

let newUser = {
  name: 'jane',
  email: 'tarzan@gmail.com',
  password: 'senha123',
}

describe('POST /users', () => {
  describe('quando o usuário é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(newUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
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

    it('o objeto não possui a propriedade "password"', () => {
      expect(response.body.user).not.to.have.property('password');
    });
  });


  describe('Quando não existir o campo name', async () => {
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
      await DBServer.stop();
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
  
  describe('Quando não existir o campo email', async () => {
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
      await DBServer.stop();
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
  
  describe('Quando não existir o campo password', async () => {
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
      await DBServer.stop();
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
});



describe('POST /login', () => {
  describe('quando o login é realizado com sucesso', () => {
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
      await DBServer.stop();
    });

    it('verifica se retorna o código 201', async () => {
      let newLogin = {
  email: 'tarzan@gmail.com',
  password: 'senha123',
      }
      
       response = await chai.request(server)
        .post('/login')
         .send(newLogin);
      
      expect(response).to.have.status(200);
    });

    it('verifica se retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('verifica se o objeto possui a propriedade "id"', () => {
      expect(response.body.user).to.have.property('id');
    });

   it('verifica se o valor "id" é uma string', () => {
      expect(response.body.user.id).to.be.a('string');
    });
  });


  // describe('Quando não existir o campo name', async () => {
  //   let response = {};
  //   const DBServer = new MongoMemoryServer();

  //   before(async () => {
  //     const URLMock = await DBServer.getUri();
  //     const connectionMock = await MongoClient.connect(URLMock,
  //       { useNewUrlParser: true, useUnifiedTopology: true }
  //     );

  //     sinon.stub(MongoClient, 'connect')
  //       .resolves(connectionMock);

  //   });

  //   after(async () => {
  //     MongoClient.connect.restore();
  //     await DBServer.stop();
  //   });

  //   it('Retorna o código de status 400', async () => {
  //     newUser = {
  //       email: 'tarzan@gmail.com',
  //       password: 'senha123',
  //     };

  //     response = await chai.request(server)
  //       .post('/users')
  //       .send(newUser);
  //     expect(response).to.have.status(400);
  //   });

  //   it('Retorna um objeto', () => {
  //     expect(response).to.be.a('object');
  //   });

  //   it('O objeto possui a propriedade "message"', () => {
  //     expect(response.body).to.have.property('message');
  //   });

  //   it('Existe uma mensagem "Invalid entries. Try again."', () => {
  //     expect(response.body.message).to.equal('Invalid entries. Try again.');
  //   });
  // });
  
  // describe('Quando não existir o campo email', async () => {
  //   let response = {};
  //   const DBServer = new MongoMemoryServer();

  //   before(async () => {
  //     const URLMock = await DBServer.getUri();
  //     const connectionMock = await MongoClient.connect(URLMock,
  //       { useNewUrlParser: true, useUnifiedTopology: true }
  //     );

  //     sinon.stub(MongoClient, 'connect')
  //       .resolves(connectionMock);

  //   });

  //   after(async () => {
  //     MongoClient.connect.restore();
  //     await DBServer.stop();
  //   });

  //   it('Retorna o código de status 400', async () => {
  //     newUser = {
  //       name: 'jane',
  //       password: 'senha123',
  //     };

  //     response = await chai.request(server)
  //       .post('/users')
  //       .send(newUser);
  //     expect(response).to.have.status(400);
  //   });

  //   it('Retorna um objeto', () => {
  //     expect(response).to.be.a('object');
  //   });

  //   it('O objeto possui a propriedade "message"', () => {
  //     expect(response.body).to.have.property('message');
  //   });

  //   it('Existe uma mensagem "Invalid entries. Try again."', () => {
  //     expect(response.body.message).to.equal('Invalid entries. Try again.');
  //   });
  // });
  
  // describe('Quando não existir o campo password', async () => {
  //   let response = {};
  //   const DBServer = new MongoMemoryServer();

  //   before(async () => {
  //     const URLMock = await DBServer.getUri();
  //     const connectionMock = await MongoClient.connect(URLMock,
  //       { useNewUrlParser: true, useUnifiedTopology: true }
  //     );

  //     sinon.stub(MongoClient, 'connect')
  //       .resolves(connectionMock);

  //   });

  //   after(async () => {
  //     MongoClient.connect.restore();
  //     await DBServer.stop();
  //   });

  //   it('Retorna o código de status 400', async () => {
  //     newUser = {
  //       name: 'jane',
  //       email: 'tarzan@gmail.com'
  //     };

  //     response = await chai.request(server)
  //       .post('/users')
  //       .send(newUser);
  //     expect(response).to.have.status(400);
  //   });

  //   it('Retorna um objeto', () => {
  //     expect(response).to.be.a('object');
  //   });

  //   it('O objeto possui a propriedade "message"', () => {
  //     expect(response.body).to.have.property('message');
  //   });

  //   it('Existe uma mensagem "Invalid entries. Try again."', () => {
  //     expect(response.body.message).to.equal('Invalid entries. Try again.');
  //   });
  // });
});