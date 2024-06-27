const express = require('express');
const router = express.Router();

const { registration, login } = require('../controllers/auth.js');
const validator = require('../middlewares/validator.js');
const { registrationBody, loginBody } = require('../validations/users');
const authenticateToken = require('../middlewares/auth.js');

// router.use(authenticateToken);
router.post('/register', validator(registrationBody), registration);
router.post('/login', validator(loginBody), login);

module.exports = router;
