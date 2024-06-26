const express = require('express');
const app = express();

const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

const fotoRouter = require('./routers/fotos.js');

require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use('/fotos', fotoRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});
