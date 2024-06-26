const express = require('express');
const router = express.Router();

const {
  store,
  index,
  show,
  update,
  destroy,
} = require('../controllers/fotos.js');

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
