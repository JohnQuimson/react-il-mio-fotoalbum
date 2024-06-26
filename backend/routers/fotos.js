const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');
const { bodyData } = require('../validations/fotos.js');
const validator = require('../middlewares/validator.js');
const authenticateToken = require('../middlewares/auth.js');

const {
  store,
  index,
  show,
  update,
  destroy,
} = require('../controllers/fotos.js');

// Rotte Pubbliche
router.get('/', index);

// Rotte Protette
// router.use(authenticateToken);

router.get('/:id', show);
router.post('/', upload.single('img'), validator(bodyData), store);
router.put('/:id', upload.single('img'), validator(bodyData), update);
router.delete('/:id', destroy);

module.exports = router;
