const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

const fotoRouter = require('./routers/fotos.js');
const categoriesRouter = require('./routers/categories.js');
const authRouter = require('./routers/auth');
const messageRouter = require('./routers/messages.js');

require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

// Rotte
app.use('/auth', authRouter);
app.use('/fotos', fotoRouter);
app.use('/categories', categoriesRouter);
app.use('/messages', messageRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});
