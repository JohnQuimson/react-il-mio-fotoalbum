const express = require('express');
const app = express();

require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});
