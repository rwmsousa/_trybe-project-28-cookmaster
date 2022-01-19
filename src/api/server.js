const app = require('./app');

const { PORT } = process.env;

app.listen(PORT || 3000, () => console.log(`conectado na porta ${PORT || 3000}`));
