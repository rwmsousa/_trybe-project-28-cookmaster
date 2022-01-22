const { expect } = require('chai');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const frisby = require('frisby');
const usersModel = require('../models/usersModel');
const usersController = require('../controllers/usersController');

const mongoDbUrl = `mongodb://${ process.env.HOST || 'mongodb' }:27017/FakeBank`;
const url = 'http://localhost:3000';

describe('USERS', () => {
  describe('Testa a criação de um novo usuário.', () => {

    let connection;
    let db;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('FakeBank');
      await db.collection('users').deleteMany({});
    });

    beforeEach(async () => {
      // await db.collection('users').deleteMany({});
    });

    afterEach(async () => {
      // await db.collection('users').deleteMany({});
    });

    after(async () => {
      // await db.collection('users').deleteMany({});
      await connection.close();
    });

    const payload = {
      name: 'Wolverine',
      email: 'logan@gmail.com',
      password: '123',
      role: 'user',
    };

    it('se retorna um objeto', async () => {
      await frisby.post(`${ url }/users/`, payload)
      // const response = await usersController.createUserController(payload);
      const response = await usersModel.createUserModel(payload)
      expect(response.status).to.be(200);
      // expect('status', 204)
      // expect(response).to.be.a('object');
    });

    //   it('se a resposta retorna os valores corretamente', async () => {
    //     const response = await usersModel.createProductModel(name, quantity);
    //     expect(response).to.have.property('_id');
    //     expect(response._id).to.be.a('object'); //mongo returns an object to _id
    //     expect(response).to.have.property('name');
    //     expect(response.name).to.be.a('string');
    //     expect(response.name).to.be.equal('bicicleta');
    //     expect(response).to.have.property('quantity');
    //     expect(response.quantity).to.be.a('number');
    //     expect(response.quantity).to.be.equal(10);
    //   });
    // });

    // describe('Testa a busca de todos os produtos.', () => {
    //   let connection;
    //   let db;

    //   before(async () => {
    //     connection = await MongoClient.connect(mongoDbUrl, {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     });
    //     db = connection.db('FakeBank');
    //     await db.collection('users').deleteMany({});
    //     const myobj = { name: 'Martelo de Thor', quantity: 10 };
    //     await db.collection('users').insertOne(myobj);
    //   });

    //   beforeEach(async () => {
    //     // await db.collection('users').deleteMany({});
    //   });

    //   afterEach(async () => {
    //     // await db.collection('users').deleteMany({});
    //   });

    //   after(async () => {
    //     // await db.collection('users').deleteMany({});
    //     await connection.close();
    //   });

    //   it('se retorna um array de objetos', async () => {
    //     const response = await usersModel.getUsersModel();
    //     expect(response).to.be.a('array');
    //     expect(response[ 0 ]).to.be.a('object');
    //     expect(response[ 0 ]).to.have.property('_id');
    //     expect(response[ 0 ]).to.have.property('name');
    //     expect(response[ 0 ]).to.have.property('quantity');
    //   })
  });
});
