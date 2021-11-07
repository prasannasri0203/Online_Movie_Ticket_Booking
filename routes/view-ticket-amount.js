const express = require('express');
const router = express.Router();
const db  = require('../db/db.js');
const jwt = require('jsonwebtoken');
const configObj =require('../config/custom-environment-variables');
const { check,validationResult } = require('express-validator');

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

//validation
const validation = [
    check('theaterId', 'Theater id is required').not().isEmpty(),
    check('movieId', 'movie id is required').not().isEmpty(),
    check('dob', 'Dob id is required').not().isEmpty(),
    check('showDate', 'Show Date id is required').not().isEmpty(),
    check('showTime', 'Show date id is required').not().isEmpty(),
    check('timeAvailableStatus', 'Time available status is required').not().isEmpty()
]

//get the ticket amount.
router.post('/get_amount',authenticateToken,validation, (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }else{

        var dob = req.body.dob;
        var datesplit = dob.split("-");
        var day = datesplit[2]
        var month = datesplit[1]
        var year = datesplit[0]
        var today = new Date()
        var age = today.getFullYear() - year;

        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
        }

        db.query(`SELECT movie_amount FROM show_movie_time WHERE theater_id = ${db.escape(req.body.theaterId)} AND
        movie_id = ${db.escape(req.body.movieId)} AND
        show_date = ${db.escape(req.body.showDate)} AND
        show_time = ${db.escape(req.body.showTime)} AND
        time_available_status = ${db.escape(req.body.timeAvailableStatus)}`,
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
            var ticketAmount ='';
                result.forEach(element => {
                   if( age >= 3 && age <= 12 ){
                         ticketAmount = element.movie_amount/2;
                    }else{
                         ticketAmount = element.movie_amount;
                    }
                });
                return res.status(200).send({
                    ticketAmount:ticketAmount
                });
          }
        }
      );
    }   
});

module.exports =router;
