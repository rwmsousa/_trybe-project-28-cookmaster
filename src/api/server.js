const app = require('./app'); // import app from app.js

const { PORT } = process.env; // import PORT from .env file

app.listen(PORT || 3000, () => console.log(`conectado na porta ${PORT || 3000}`)); // listen on PORT or 3000
