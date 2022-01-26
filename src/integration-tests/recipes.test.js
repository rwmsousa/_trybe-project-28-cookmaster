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
    await db.collection('recipes').deleteMany({});
  });

  afterEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('Verifica se é possível cadastrar nova receita', async () => {

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

  it('Verifica se é possível cadastrar nova receita sem informar o NOME', async () => {

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

      ingredients: "maçã e água",
      preparation: "Bater tudo no liquidificador",
    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe)
      .then((response) => response);

    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Invalid entries. Try again.');
  });

  it('Verifica se é possível cadastrar nova receita sem informar os INGREDIENTES', async () => {

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

      preparation: "Bater tudo no liquidificador",
    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe)
      .then((response) => response);

    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Invalid entries. Try again.');
  });

  it('Verifica se é possível cadastrar nova receita sem informar a PREPARAÇÃO', async () => {

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

    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe)
      .then((response) => response);

    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Invalid entries. Try again.');
  });

  it('Verifica se busca todas as receitas', async () => {

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

  it('Verifica se BUSCA uma receita específica PELO ID', async () => {

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
      .get(`/recipes/${ response.body.recipe._id }`)
      .then((response) => response);

    expect(recipes.body.name).to.equal('suco de maçã');
    expect(recipes.body.ingredients).to.equal('maçã e água');
    expect(recipes.body.preparation).to.equal('Bater tudo no liquidificador');
  });

  it('Verifica se é possível ALTERAR nova RECEITA', async () => {

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

    const updateRecipe = {
      name: "suco de uva",
      ingredients: "uva e água",
      preparation: "Bater tudo no liquidificador",
    };

    const responseUpdate = await chai.request(server)
      .put(`/recipes/${ response.body.recipe._id }`)
      .set('authorization', token)
      .send(updateRecipe)
      .then((response) => response);

    expect(responseUpdate).to.have.status(200);
    expect(responseUpdate.body.name).to.equal('suco de uva');
    expect(responseUpdate.body.ingredients).to.equal('uva e água');
    expect(responseUpdate.body.preparation).to.equal('Bater tudo no liquidificador');
  });

  it('Verifica se EXLUI uma receita específica PELO ID', async () => {

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

    const recipe1 = {
      name: "suco de uva",
      ingredients: "uva e água",
      preparation: "Bater tudo no liquidificador",
    };

    const response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe1)
      .then((response) => response);
    console.log('_ID', response.body.recipe._id);

    const recipe2 = {
      name: "suco de maçã",
      ingredients: "maçã e água",
      preparation: "Bater tudo no liquidificador",
    };

    await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(recipe2)
      .then((response) => response);

    await chai.request(server)
      .delete(`/recipes/${ response.body.recipe._id }`)
      .set('authorization', token)

    const recipes = await chai.request(server)
      .get('/recipes')
      .then((response) => response);

    const findRecipe = recipes.body.find(recipe => recipe._id === response.body.recipe._id);
    
    expect(findRecipe).to.be.undefined;
    expect(recipes.body.length).to.equal(1);
  });
});
