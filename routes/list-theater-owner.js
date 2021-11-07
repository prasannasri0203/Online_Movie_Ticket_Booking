const express = require('express');
const router = express.Router();
const db  = require('../db/db.js');
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');
const authenticateToken = require('../middleware/jwt-token-middleware');


//view (or) users theater owner.
router.get('/',authenticateToken, (req, res, next) => {
    
    db.query(`SELECT * FROM users WHERE user_role = 1`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if(!result.length) {
          return res.status(200).send({
            msg:'No Data Available'
          });
        } else {
          return res.status(200).send({
            msg:result
          });
        }
      }
    );
});

module.exports =router;
