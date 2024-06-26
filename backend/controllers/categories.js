const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require('../middlewares/errorHandler.js');

const store = async (req, res) => {
  const { name } = req.body;

  const data = { name };

  try {
    const category = await prisma.category.create({ data });
    res.status(200).send(category);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Nessuna categoria trovata.' });
    }

    res.status(200).json(category);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {};
const destroy = async (req, res) => {};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
