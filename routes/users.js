const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db  = require('../db/db.js');
const { check, validationResult  } = require('express-validator');
const jwt = require('jsonwebtoken');
 
const signupValidation =[
  check('name', 'Name is requied').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
] 
//register API
router.post('/register',signupValidation, (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }else{
        db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
        (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This user is already in use!'
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
            // add to database
              db.query(
                `INSERT INTO users (name, email, password,user_role) VALUES ('${req.body.name}', 
                ${db.escape(req.body.email)}, ${db.escape(hash)},${db.escape(req.body.userRole)})`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'The user has been registered with us!'
                  });
                }
              );
            }
          });
        }
      }
    );
    }
    
  });

module.exports =router;
