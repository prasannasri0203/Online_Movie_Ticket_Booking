const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');
const add = require('../controller/theater-screen-seat-ctrl');
const update = require('../controller/theater-screen-seat-ctrl');
const authenticateToken = require('../middleware/jwt-token-middleware');



router.post('/add',authenticateToken,add.add);
router.patch('/update/:id',authenticateToken,update.update);

module.exports = router;