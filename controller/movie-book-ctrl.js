const db  = require('../db/db.js');
const { check,validationResult } = require('express-validator');
var app = require('express');
var {expressValidator } = require('express-validator');

// app.use(expressValidator());

//add ticket
function add(req,res,next){
    
    try {
        
        
         
        req.body.bookMovieData.forEach(element => {
            //calculate the age
            var dob = element.dob;
            var datesplit=dob.split("-");
            var year = datesplit[2]
            var month = datesplit[1]
            var day = datesplit[0]
            var today = new Date()
            var age = today.getFullYear() - year;

            if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
                age--;
            }

            var movieTimeId = element.movieTimeId;
            var screenSeatId = element.screenSeatId;
            var visitorUserId = element.visitorUserId;
            var personName = element.personName;
            var age = age;
            var dob = dob;
            var ticketAmount = element.ticketAmount;

            db.query(`INSERT INTO book_movie (movie_time_id, screen_seat_id,visitor_user_id,person_name,
                age,dob,ticket_amount) VALUES ('${movieTimeId}',${db.escape(screenSeatId)},
                ${db.escape(visitorUserId)},${db.escape(personName)},${db.escape(age)},
                ${db.escape(dob)},${db.escape(ticketAmount)})`,(err, result) => {
                if (err) {
                    throw err;
                    return res.status(400).send({
                    msg: err
                    });                                                                                                                                                                     
                }
                return res.status(201).send({
                    msg: 'Your ticket has been created...'
                });
            });
        });
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
}
module.exports.add = add;
