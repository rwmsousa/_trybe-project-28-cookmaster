const { MongoClient } = require('mongodb'); // import MongoClient from mongodb
require('dotenv').config(); // import .env file

const OPTIONS = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => (
    db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
    }));

module.exports = connection;

// connection with mysql2
// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'trybe123',
//     database: 'model_example'
// });

// module.exports = connection;
