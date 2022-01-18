const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipeModel = async (recipeData, user) => {
    const db = await connect();
    const { _id } = user;
    
    const recipeInserted = await db.collection('recipes')
        .insertOne(recipeData)
        .then((result) => ({
            name: result.ops[0].name,
            ingredients: result.ops[0].ingredients,
            preparation: result.ops[0].preparation,
            userId: _id,
            _id: result.insertedId,
        }));

    return recipeInserted;
};

const getRecipesModel = async () => {
    const db = await connect();
    
    const recipes = await db.collection('recipes').find().toArray();

    return recipes;
};

const getRecipeIdModel = async (id) => {
    // https: //mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#objectid-isvalid
    // https: //mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html
    if (!ObjectId.isValid(id)) return null;

    const db = await connect();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

    return recipe;
};

// const updateRecipeModel = async (id, userId, quantity) => {
//     const db = await connect();

//     await db.collection('recipes')
//         .updateOne({
//             _id: ObjectId(id),
//             'itensSold.userId': userId,
//         }, { $set: { 'itensSold.$.quantity': quantity } });

//     const recipeUpdated = await db.collection('recipes').findOne({ _id: ObjectId(id) });

//     return recipeUpdated;
// };

// const deleteRecipeModel = async (id, itensSold) => {
//     const db = await connect();

//     await db.collection('users')
//         .updateOne({ _id: ObjectId(itensSold[0].userId) }, {
//             $inc: {
//                 quantity: itensSold[0].quantity,
//             },
//         });

//     await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
//     const recipe = getRecipeIdModel(id);
//     return recipe;
// };

module.exports = {
    createRecipeModel,
    getRecipesModel,
    getRecipeIdModel,
    // updateRecipeModel,
    // deleteRecipeModel,
};

// SQL: Busca todos os autores do banco.
// const getAll = async() => {
//     const [recipes] = await connection.execute(
//         'SELECT id, first_recipeName, middle_recipeName, last_recipeName FROM model_example.recipes;',
//     );
//     return recipes.map(serialize);
// };

// SQL: Busca um autor específico, a partir do seu ID
// const findById = async(id) => {
//     // Repare que substituímos o id por `?` na query.
//     // Depois, ao executá-la, informamos um array com o id para o método `execute`.
//     // O `mysql2` vai realizar de forma segura, a substituição do `?` pelo id informado, isso previne possíveis ataques de sql injection.
//     const query = 'SELECT id, first_recipeName, middle_recipeName, last_recipeName FROM model_example.recipes WHERE id = ?'
//     const [recipeData] = await connection.execute(query, [id]);

//     if (recipeData.length === 0) return null;

//     // Utilizamos [0] para buscar a primeira linha, que deve ser a única no array de resultados, pois estamos buscando por ID.
//     return serialize(recipeData[0]);
// };

// SQL: Cria um novo autor no banco.
// const create = async(recipeName,  recipeQuantity) => connection.execute(
//
// 'INSERT INTO model_example.recipes (first_recipeName, middle_recipeName, last_recipeName) VALUES (?,?,?)', [recipeName, recipeQuantity],
// );
