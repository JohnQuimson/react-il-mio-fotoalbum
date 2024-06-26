const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Title è un campo obbligatorio.',
      bail: true,
    },
    isString: {
      errorMessage: 'Title deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Title deve essere di almeno 3 caratteri',
      options: { min: 3 },
    },
    trim: true,
  },
  description: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Description è un campo obbligatorio.',
      bail: true,
    },
    isString: {
      errorMessage: 'Description deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Description deve essere di almeno 3 caratteri',
      options: { min: 3 },
    },
    trim: true,
  },
  visible: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'Visible deve essere un booleano.',
    },
    toBoolean: true,
  },
  categories: {
    in: ['body'],
    isArray: {
      errorMessage: 'Categories deve essere un array di interi.',
      bail: true,
    },
    custom: {
      options: async (ids) => {
        const invalidId = ids.find((id) => isNaN(parseInt(id)));
        if (invalidId) {
          throw new Error('Uno o più ID delle categorie non sono validi.');
        }
        const categories = await prisma.category.findMany({
          where: { id: { in: ids.map((id) => parseInt(id)) } },
        });
        if (categories.length !== ids.length) {
          throw new Error('Una o più categorie specificate non esistono.');
        }
        return true;
      },
    },
    customSanitizer: {
      options: (ids) => ids.map((id) => ({ id: parseInt(id) })),
    },
  },
  img: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Img deve essere una stringa.',
      bail: true,
    },
  },
};

module.exports = {
  bodyData,
};
