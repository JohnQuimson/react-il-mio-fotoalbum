const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require('../middlewares/errorHandler.js');
const deletePic = require('../utils/deletePic.js');

// -------------------------------------------
// STORE
// -------------------------------------------
const store = async (req, res) => {
  const { title, description, visible, categories } = req.body;

  const data = {
    title,
    description,

    visible: req.body.available ? true : false,
    categories: {
      connect: categories.map((id) => ({ id: parseInt(id) })),
    },
  };

  if (req.file) {
    data.img = `${HOST}:${port}/foto_pics/${req.file.filename}`;
  }

  try {
    const foto = await prisma.foto.create({
      data,
    });
    res.status(200).send(foto);
  } catch (err) {
    if (req.file) {
      deletePic('foto_pics', req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// INDEX
// -------------------------------------------
const index = async (req, res) => {
  try {
    const fotos = await prisma.foto.findMany({
      include: {
        categories: true,
      },
    });

    res.status(200).json(fotos);
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
    errorHandler(err, req, res);
  }
};

// -------------------------------------------
// UPDATE
// -------------------------------------------
const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, visible, categories } = req.body;
  const img = req.file
    ? `${HOST}:${port}/foto_pics/${req.file.filename}`
    : null;

  try {
    const currentFoto = await prisma.foto.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // controllo esistenza foto
    if (!currentFoto) {
      return res.status(404).json({ error: 'Nessuna foto trovata' });
    }

    // sostituzione dati con quelli nuovi
    const updatedData = {
      title: title || currentFoto.title,
      description: description || currentFoto.description,
      img: img || currentFoto.img,
      visible: visible !== undefined ? visible === 'true' : currentFoto.visible,
      categories: {
        set: categories.map((categoryId) => ({ id: parseInt(categoryId) })),
      },
    };

    // update nel db
    const updatedFoto = await prisma.foto.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });

    res.status(200).json(updatedFoto);
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
    const foto = await prisma.foto.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!foto) {
      return res.status(404).json({ error: 'Nessuna foto trovata' });
    }

    await prisma.foto.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (foto.img) {
      const imgPath = foto.img.split('/').pop();
      deletePic('foto_pics', imgPath);
    }

    res.status(200).json(`Foto con id ${id} cancellata con successo`);
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
