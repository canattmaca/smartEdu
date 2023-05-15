const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup').post(authControllers.createUser); //http://localhost:3000/users/signup
router.route('/login').post(authControllers.loginUser); //http://localhost:3000/users/login
router.route('/logout').get(authControllers.logoutUSer);
module.exports = router; //http://localhost:3000/users/logout => buraya get isteyi yaptığım zaman session u destroy edip ana sayfaya dönücez
