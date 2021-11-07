const express = require('express');
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const listTheaterOwner = require('./routes/list-theater-owner');
const theaterScreenSeat = require('./routes/theater-screen-seat');
const show  = require('./routes/show-router');
const trailerView = require('./routes/trailer-router');
const movieBook = require('./routes/movie-book-router'); 
const viewTicketAmount = require('./routes/view-ticket-amount');
const MovieRatingDetails = require('./routes/movie-rating-detail-router');
var path = require('path');
const cron = require("node-cron");
var sendMail = require('./cron_job/mail-cron-job.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use( express.static("public"));

//read the json data from API
app.use(express.json());
//register API
app.use('/api/users', users);
//login API
app.use('/api/auth', auth);
//theater owner user list
app.use('/api/list_theater_owner',listTheaterOwner);
//add and update the theater seat
app.use('/api/theater_screen_seat',theaterScreenSeat);
//add,update,delete the show time
app.use('/api/show',show);
//view the movie tailer API
app.use('/api/movieTrailer',trailerView);
//add movie book ticket
app.use('/api/movie_book',movieBook);
//get amount of ticket for kids and adult
app.use('/api/kid_concession',viewTicketAmount);
//get amount of ticket for kids and adult
app.use('/api/movie_rating_details',MovieRatingDetails);


//extended the request data from API
app.use(bodyParser.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

//validate the API middleware
app.use('*', function (req, res) {
  res.status(404).send({error: "This url is not defined."})
});

const port = process.env.PORT || 4001;
app.listen(port,()=>{
  console.log(`Listening on port ${port}...`)
});
// Calling cronjob every 2 minute
cron.schedule("*/2 * * * *", function() {
  console.log('cronjob running.....');
  sendMail.sendMail();
});
