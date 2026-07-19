const express = require('express');
const bookCtrl = require('../controllers/userCtrl')

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;