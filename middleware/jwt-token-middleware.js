const express = require('express');
const router = express.Router();
const db  = require('../db/db.js');
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');

//jwt middleware
const authenticateToken = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token,configObj.PrivateKey, (err,user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

module.exports = authenticateToken;