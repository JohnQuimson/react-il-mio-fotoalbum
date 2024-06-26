const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  const { title, description, img, visible, categories } = req.body;

  const data = {
    title,
    description,
    img,
    visible: req.body.available ? true : false,
    categories: {
      connect: categories,
    },
  };

  try {
    const foto = await prisma.foto.create({
      data,
    });
    res.status(200).send(foto);
  } catch (err) {
    if (req.file) {
    }
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {};
const show = async (req, res) => {};
const update = async (req, res) => {};
const destroy = async (req, res) => {};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
