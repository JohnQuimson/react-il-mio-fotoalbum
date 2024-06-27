const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require('../middlewares/errorHandler.js');

// -------------------------------------------
// STORE
// -------------------------------------------
const store = async (req, res) => {
  const { email, content } = req.body;

  const data = { email, content };

  try {
    const message = await prisma.message.create({ data });
    res.status(200).send(message);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// INDEX
// -------------------------------------------
const index = async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// SHOW
// -------------------------------------------
const show = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await prisma.message.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!message) {
      return res.status(404).json({ error: 'Nessun messaggio trovato' });
    }

    res.status(200).json(message);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// UPDATE
// -------------------------------------------
const update = async (req, res) => {
  const { id } = req.params;
  const { email, content } = req.body;

  try {
    const existingMessage = await prisma.message.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingMessage) {
      return res.status(404).json({ error: 'Nessun messaggio trovato' });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email || existingMessage.email,
        content: content || existingMessage.content,
      },
    });

    res.status(200).json(updatedMessage);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// DESTROY
// -------------------------------------------
const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const existingMessage = await prisma.message.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingMessage) {
      return res.status(404).json({ error: 'Nessun messaggio trovato' });
    }

    await prisma.message.delete({
      where: {
        id: parseInt(id),
      },
    });

    res
      .status(200)
      .json({ message: `Messaggio con id ${id} cancellato con successo` });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
