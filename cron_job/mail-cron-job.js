var winston = require('winston');
const db  = require('../db/db.js');
var fs = require("fs");
const nodemailer = require('nodemailer');
var ejs = require("ejs");
  
// Send Mail function using Nodemailer
function sendMail() {
   
    db.query(`SELECT * FROM users`,(err, result) => {
        if (err) {
            winston.log(err);
        }
        if(!result.length) {
            winston.info('No data available');
        } else {

        result.forEach(element => {
            
            db.query(`SELECT U.name,U.email,BM.person_name,BM.ticket_amount,T.theater_name,M.movie_name,
            TSS.seat_no,SMT.show_date,SMT.show_time FROM book_movie as BM
            INNER JOIN users as U ON BM.visitor_user_id = U.id
            INNER JOIN movie as M  ON BM.movie_id = M.id
            INNER JOIN theater as T ON BM.theater_id = T.id
            INNER JOIN theater_screen_seat as TSS ON BM.screen_seat_id = TSS.id
            INNER JOIN show_movie_time as SMT ON BM.movie_time_id = SMT.id 
            WHERE BM.visitor_user_id=${db.escape(element.id)}`,(errData, resultData) => {
                if (errData) {
                    winston.log('errData',errData);
                }
                if(!resultData.length) {
                    winston.log('resultData',"There is no data!");
                } else {
                
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'prasannasricse@gmail.com',
                            pass: '!Password@123#'
                        }
                    });

                    ejs.renderFile('E:/movie/views/mail-cron-job.ejs', {ticketDetails: resultData}, function (err, data) {
                        if (err) {
                            winston.log('err',err);
                        } else {
                            var mainOptions = {
                                from: "prasannasricse@gmail.com",
                                to: resultData[0].email,
                                subject: 'Notification of Movie Ticket Details for '+resultData[0].movie_name,
                                html: data
                            };
                            transporter.sendMail(mainOptions, function (errInfo, info) {
                                if (err) {
                                    winston.log('errInfo',errInfo);
                                } else {
                                    winston.log('info','mail sent successfully...');
                                    console.log('mailed');
                                }
                            });
                        }
                    });
            }
        });
    });            

           
    }
});
}

module.exports.sendMail= sendMail;

