const bodyData = {
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email è un campo obbligatorio.',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Email deve essere una email valida',
    },
  },
  content: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Content è un campo obbligatorio.',
      bail: true,
    },
    isString: {
      errorMessage: 'Content deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Content deve essere di almeno 3 caratteri',
      options: { min: 3 },
    },
    trim: true,
  },
};

module.exports = {
  bodyData,
};
