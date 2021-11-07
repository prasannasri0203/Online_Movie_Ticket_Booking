const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');
const add = require('../controller/show-ctrl');
const update = require('../controller/show-ctrl');
const remove = require('../controller/show-ctrl');
const authenticateToken = require('../middleware/jwt-token-middleware');


router.post('/add',authenticateToken,add.add);
router.patch('/update/:id',authenticateToken,update.update);
router.delete('/delete/:id',authenticateToken,remove.remove);

module.exports = router;