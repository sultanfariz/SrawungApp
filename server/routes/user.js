const express = require('express');
const router = express.Router();
const user = require('../controller/user');

//REGISTER CONTROLLER
router.get('/user', user.index);
router.post('/register', user.register);
router.get('/user/:id', user.show);
router.put('/user/:id', user.edit);
router.delete('/user/:id', user.delete);

//LOGIN CONTROLLER
router.get('/auth', user.auth);
router.post('/login', user.login);
router.post('/logout', user.logout);

module.exports = router;