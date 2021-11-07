const db  = require('../db/db.js');

//add seat
function add(req,res,next){
    try {
        var seatClass = req.body.seatClass;
        var seatNo = req.body.seatNo;
        var status = req.body.status;

        db.query(`INSERT INTO theater_screen_seat (seat_class, seat_no, status) VALUES ('${seatClass}', 
            ${db.escape(seatNo)},${db.escape(status)})`,
            (err, result) => {
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
//update seat 
function update(req,res,next){
    
    try {
        var seatClass = req.body.seatClass;
        var seatNo = req.body.seatNo;
        var status = req.body.status;
        
        db.query(`UPDATE theater_screen_seat SET seat_class = ${seatClass},seat_no = ${db.escape(seatNo)},
        status = ${db.escape(status)} WHERE id = ${db.escape(req.params.id)}`, (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                msg: err
                });                                                                                                                                                                     
            }
            return res.status(201).send({
                msg: 'The seat has been updated...'
            });
            }
        );
    }catch(err){
            res.status(500).send({error: "Something Went to Wrong"})
    }
}

module.exports.add = add;
module.exports.update = update;
