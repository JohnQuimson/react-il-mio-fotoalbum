const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require('../middlewares/errorHandler.js');

const store = async (req, res) => {
  const { title, description, img, visible, categories } = req.body;

  const data = {
    title,
    description,
    img,
    visible: req.body.available ? true : false,
    categories: {
      connect: categories.map((id) => ({ id: parseInt(id) })),
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

const index = async (req, res) => {
  try {
    const fotos = await prisma.foto.findMany({
      include: {
        categories: true,
      },
    });

    res.status(200).json(fotos);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero delle Foto' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const foto = await prisma.foto.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        categories: true,
      },
    });

    // controllo se la foto non esiste
    if (!foto) {
      return res.status(404).json({ error: 'Nessuna foto trovata' });
    }

    res.status(200).json(foto);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero della Foto' });
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
