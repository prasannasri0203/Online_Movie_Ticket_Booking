const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');
const view = require('../controller/trailer-ctrl');
const authenticateToken = require('../middleware/jwt-token-middleware');



router.get('/view',authenticateToken,view.view);

module.exports = router;