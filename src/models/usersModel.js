// const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const connect = require('./connection');

const { JWT_SECRET } = process.env || 'secret'; // import JWT_SECRET from .env file

const createUserModel = async (user) => {
    const db = await connect();

    const userInserted = await db.collection('users')
        .insertOne(user)
        .then((result) => ({
            name: result.ops[0].name,
            email: result.ops[0].email,
            role: result.ops[0].role,
            _id: result.insertedId,
        }));

    return userInserted;
};

const findUserByEmailModel = async (email) => {
    const db = await connect();

    const user = await db.collection('users')
        .findOne({ email }, { projection: { name: 1, email: 1, role: 1, _id: 1 } });
    
    return user;
};

const verifyUsersModel = async (email, password) => {
    const db = await connect();
    
    const user = await db.collection('users')
        .findOne({ $and: [{ email }, { password }] },
            { projection: { name: 1, email: 1, role: 1, _id: 1 } });
    
   return { user };
};

const tokenGenerateModel = async (login) => {
    const { user } = await verifyUsersModel(login.email, login.password);

    if (!user) return null;

    const token = jwt.sign(user, JWT_SECRET);

    return token;
};

// const existsVerifyName = async (name) => {
//     const db = await connect();

//     const userExists = await db.collection('users')
//         .findOne({ name });

//     return userExists;
// };

// const getUsersModel = async () => {
//     const db = await connect();

//     const users = await db.collection('users').find().toArray();

//     return users;
// };

// const getUserIdModel = async (id) => {
//     // https: //mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#objectid-isvalid
//     // https: //mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html
//     if (!ObjectId.isValid(id)) return null;

//     const db = await connect();

//     const user = await db.collection('users').findOne({ _id: ObjectId(id) });

//     return user;
// };

// const updateUserModel = async (id, name, quantity) => {
//     const db = await connect();

//     await db.collection('users')
//         .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

//     return getUserIdModel(id);
// };

// const deleteUserModel = async (id) => {
//     const db = await connect();

//     const response = await db.collection('users').deleteOne({ _id: ObjectId(id) });

//     return response;
// };

module.exports = {
    createUserModel,
    findUserByEmailModel,
    verifyUsersModel,
    tokenGenerateModel,
    // existsVerifyName,
    // getUsersModel,
    // getUserIdModel,
    // updateUserModel,
    // deleteUserModel,
};

// SQL: Busca todos os autores do banco.
// const getAll = async() => {
//     const [users] = await connection.execute(
//         'SELECT id, first_userName, middle_userName, last_userName FROM model_example.users;',
//     );

//     return users.map(serialize);
// };

// SQL: Busca um autor específico, a partir do seu ID
// const findById = async(id) => {
//     // Repare que substituímos o id por `?` na query.
//     // Depois, ao executá-la, informamos um array com o id para o método `execute`.
//     // O `mysql2` vai realizar de forma segura, a substituição do `?` pelo id informado, isso previne possíveis ataques de sql injection.
//     const query = 'SELECT id, first_userName, middle_userName, last_userName FROM model_example.users WHERE id = ?'
//     const [userData] = await connection.execute(query, [id]);

//     if (userData.length === 0) return null;

//     // Utilizamos [0] para buscar a primeira linha, que deve ser a única no array de resultados, pois estamos buscando por ID.
//     return serialize(userData[0]);
// };

// SQL: Cria um novo autor no banco.
// const create = async(userName,  userQuantity) => connection.execute(
//     'INSERT INTO model_example.users (first_userName, middle_userName, last_userName) VALUES (?,?,?)', [userName,  userQuantity],
// );
