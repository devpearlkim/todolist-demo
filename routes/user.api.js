const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 회원가입 endpoint
router.post('/', (req, res) => {
  userController.createUser(req, res);
});

router.post('/login', (req, res) => {
  userController.loginWithEmail(req, res);
});

module.exports = router;
