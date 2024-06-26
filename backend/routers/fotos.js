const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');

const {
  store,
  index,
  show,
  update,
  destroy,
} = require('../controllers/fotos.js');

router.get('/', index);
router.get('/:id', show);
router.post('/', upload.single('img'), store);
router.put('/:id', upload.single('img'), update);
router.delete('/:id', destroy);

module.exports = router;
