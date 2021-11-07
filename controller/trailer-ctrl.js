const db  = require('../db/db.js');

//View the movie trailer 
function view(req,res,next){

        db.query(`SELECT * FROM movie ORDER BY id DESC`,
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
        });
}

module.exports.view = view;
