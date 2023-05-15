const express = require('express');
const categoryControllers = require('../controllers/categoryControllers');

const router = express.Router();

router.route('/').post(categoryControllers.createCategory); //http://localhost:3000/categories

module.exports = router;
