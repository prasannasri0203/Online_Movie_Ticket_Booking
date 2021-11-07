const express = require('express')
var router = express()
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const configObj = require('../config/custom-environment-variables');
const { body } = require('express-validator');
const add =require('../controller/movie-rating-details-ctrl');
const view =require('../controller/movie-rating-details-ctrl');
const authenticateToken = require('../middleware/jwt-token-middleware');

  //validation
var validation = [
    body('visitorUserId','user id is requied').not().isEmpty(),
    body('movieId','movie id is requied').not().isEmpty(),
    body('rating','Rating is requied').not().isEmpty()
]

router.post('/add',authenticateToken,validation,add.add);
router.get('/read',authenticateToken,view.view);

module.exports = router;  