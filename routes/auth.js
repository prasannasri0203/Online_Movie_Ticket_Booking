const config = require('config');
const configObj = require('../config/custom-environment-variables');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../db/db.js');
const router = express.Router();
const { check,validationResult } = require('express-validator');

//login validation
const loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

//login API
router.post('/login', loginValidation, (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      res.json(errors)
  }else{
    db.query(`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,(err, result) => {
      // user does not exists
      if (err) {
        // throw err;
        return res.status(400).send({
          msg: err
        });
      }
      console.log(result.length);
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      console.log(result[0]['password']);
      // check password
      bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Email or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({id:result[0].id},configObj.PrivateKey,{ expiresIn: '1000h' });
              
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  } 
});

module.exports = router;