const db  = require('../db/db.js');

//add show
function add(req,res,next){
    try {

        var theaterOwnerUserId = req.body.theaterOwnerUserId;
        var treaterId = req.body.treaterId;
        var movieId = req.body.movieId;
        var showDate = req.body.showDate;
        var showTime = req.body.showTime;
        var movieAmount = req.body.movieAmount;
        var timeAvailbleStatus = req.body.timeAvailbleStatus;

        db.query(`INSERT INTO show_movie_time (theater_owner_user_id,theater_id,movie_id,show_date,show_time,movie_amount,time_available_status) VALUES ('${theaterOwnerUserId}', 
            ${db.escape(treaterId)},${db.escape(movieId)},${db.escape(showDate)},${db.escape(showTime)},
            ${db.escape(movieAmount)},${db.escape(timeAvailbleStatus)})`,(err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                msg: err
                });                                                                                                                                                                     
            }
            return res.status(201).send({
                msg: 'The seat has been added...'
            });
            }
        );
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
}
//update show 
function update(req,res,next){
    
    try {
        var theaterOwnerUserId = req.body.theaterOwnerUserId;
        var theaterId = req.body.theaterId;
        var movieId = req.body.movieId;
        var showDate = req.body.showDate;
        var showTime = req.body.showTime;
        var movieAmount = req.body.movieAmount;
        var timeAvailableStatus = req.body.timeAvailableStatus;
        
        db.query(`UPDATE show_movie_time SET theater_owner_user_id = ${theaterOwnerUserId},theater_id = ${db.escape(theaterId)},
        movie_id = ${db.escape(movieId)},show_date =${db.escape(showDate)},show_time =${db.escape(showTime)},
        movie_amount =${db.escape(movieAmount)}, time_available_status =${db.escape(timeAvailableStatus)} 
        WHERE id = ${db.escape(req.params.id)}`, (err, result) => {

            if (err) {
                return res.status(400).send({
                msg: err
               });
            }else{
                return res.status(201).send({
                    msg: 'The seat has been updated...'
                });
            }
        }
        );
    }catch(err){
            res.status(500).send({error: "Something Went to Wrong"})
    }
}

//delete show 
function remove(req,res,next){
    
    try {
        db.query(`DELETE FROM show_movie_time WHERE id = ${db.escape(req.params.id)}`, (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                msg: err
                });                                                                                                                                                                     
            }
            return res.status(201).send({
                msg: 'The seat has been deleted...'
            });
            }
        );
    }catch(err){
            res.status(500).send({error: "Something Went to Wrong"})
    }
}

module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
