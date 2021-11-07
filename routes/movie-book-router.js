const express = require('express')
var router = express()
const jwt = require('jsonwebtoken');
const configObj = require('../config/custom-environment-variables');
const add = require('../controller/movie-book-ctrl');
const { body,validationResult } = require('express-validator');
const db  = require('../db/db.js');
var fs = require("fs");
const nodemailer = require('nodemailer');
var ejs = require("ejs");
const authenticateToken = require('../middleware/jwt-token-middleware');

// ticket validation
var ticketValidation = [
     body('bookMovieData').isArray(),
     body('bookMovieData.*.movieId','Movie id is requied').not().isEmpty(),
     body('bookMovieData.*.movieTimeId','Movie time id is requied').not().isEmpty(),
     body('bookMovieData.*.theaterId','Theater id is requied').not().isEmpty(),
     body('bookMovieData.*.screenSeatId','Screen seat id is requied').not().isEmpty(),
     body('bookMovieData.*.visitorUserId','Visitor user id is requied').not().isEmpty(),
     body('bookMovieData.*.personName','Person name is requied').not().isEmpty(),
     body('bookMovieData.*.ticketAmount','Ticket amount is requied').not().isEmpty()
]
//create ticket and send mail
router.post('/add',authenticateToken,ticketValidation,(req, res, next) => {

    try{
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            res.json(errors);
        }

        req.body.bookMovieData.forEach(element => {

            var movieId = element.movieId;
            var movieTimeId = element.movieTimeId;
            var theaterId = element.theaterId;
            var screenSeatId = element.screenSeatId;
            var visitorUserId = element.visitorUserId;
            var personName = element.personName;
            var ticketAmount = element.ticketAmount;

            db.query(`INSERT INTO book_movie (movie_id,movie_time_id,theater_id,screen_seat_id,visitor_user_id,
                person_name,ticket_amount) VALUES (${movieId},${movieTimeId},${theaterId},
                    ${db.escape(screenSeatId)},${db.escape(visitorUserId)},${db.escape(personName)},
                    ${db.escape(ticketAmount)})`,(err, result) => {
                       
                    if (err) {
                        // throw err;
                        return res.status(400).send({
                        msg: err
                        });                                                                                                                                                                     
                    }
            });
        });

        db.query(`SELECT U.name,U.email,BM.person_name,BM.ticket_amount,T.theater_name,M.movie_name,
            TSS.seat_no,SMT.show_date,SMT.show_time FROM book_movie as BM
            INNER JOIN users as U ON BM.visitor_user_id = U.id
            INNER JOIN movie as M  ON BM.movie_id = M.id
            INNER JOIN theater as T ON BM.theater_id = T.id
            INNER JOIN theater_screen_seat as TSS ON BM.screen_seat_id = TSS.id
            INNER JOIN show_movie_time as SMT  ON BM.movie_time_id = SMT.id
            WHERE BM.movie_id =${db.escape(req.body.bookMovieData[0]['movieId'])} AND BM.movie_time_id=${db.escape(req.body.bookMovieData[0]['movieTimeId'])} 
            AND BM.theater_id=${db.escape(req.body.bookMovieData[0]['theaterId'])} AND BM.visitor_user_id =${db.escape(req.body.bookMovieData[0]['visitorUserId'])}`,
            (errData, resultData) => {
                    
                if (errData) {
                    return res.status(400).send({
                    msg: errData
                    });
                }
                if(!resultData.length) {
                    return res.status(200).send({
                    msg:'There is no record to send mail here!!!'
                    });
                } else {
                
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'prasannasricse@gmail.com',
                            pass: '!Password@123#'
                        }
                    });

                    ejs.renderFile('E:/movie/views/mail.ejs', {ticketDetails: resultData}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            var mainOptions = {
                                from: "prasannasricse@gmail.com",
                                to: resultData[0].email,
                                subject: 'Movie Ticket Details',
                                html: data
                            };
                            transporter.sendMail(mainOptions, function (err, info) {
                                if (err) {
                                    return res.status(400).send({
                                        msg: err
                                        });
                                } else {

                                    return res.status(200).send({
                                        msg:'Your ticket has been booked and sent a confirmation mail...'
                                    });
                                }
                            });
                        }
                    });
            }
        });
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
});

module.exports = router;  