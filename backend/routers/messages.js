const express = require('express');
const router = express.Router();
const { bodyData } = require('../validations/messages.js');
const validator = require('../middlewares/validator.js');
const authenticateToken = require('../middlewares/auth.js');

const {
  store,
  index,
  show,
  update,
  destroy,
} = require('../controllers/messages.js');

// Rotte Protette
// router.use(authenticateToken);

router.post('/', validator(bodyData), store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', validator(bodyData), update);
router.delete('/:id', destroy);

module.exports = router;
