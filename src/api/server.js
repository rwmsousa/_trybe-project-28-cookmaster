const app = require('./app'); // import app from app.js

const PORT = process.env.PORT || 3000; // import PORT from .env file

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`)); // listen on PORT or 3000