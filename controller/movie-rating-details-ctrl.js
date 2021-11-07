const db  = require('../db/db.js');
const { body,validationResult } = require('express-validator');

//add movie rating
function add(req,res,next){
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.json(errors)
        }else{
            var visitorUserId = req.body.visitorUserId;
            var movieId = req.body.movieId;
            var rating = req.body.rating;
            
            db.query(`INSERT INTO rating (visitor_user_id,movie_id,rating) VALUES ('${visitorUserId}', 
                ${db.escape(movieId)},${db.escape(rating)})`,(err, result) => {
                if (err) {
                    throw err;
                    return res.status(400).send({
                    msg: err
                    });                                                                                                                                                                     
                }
                return res.status(201).send({
                    msg: 'The Rating has been added...'
                });
                }
            );
        }
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
}

//view movie rating
function view(req,res,next){
    try {
         
        db.query(`SELECT * FROM rating ORDER BY id DESC`,(err, result) => {
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
        });
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
}
module.exports.add = add;
module.exports.view = view;
