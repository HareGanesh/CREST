const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = Promise;

mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


const app = express();
const port = 3777;
const students = require('./routes/students');
const events = require('./routes/Events');

//MIDDLEWARE
app.use(cors());//run on diff port
//app.use(bodyParser.json());//grab data from frontend

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


app.use(passport.initialize());
app.use(passport.session());


//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//ROUTING
require('./config/passport')(passport);
app.use('/students', students);
app.use('/Events', events);

//app.use('/events', events);
// app.use('/students', function(students, res, next) {
// var _send = res.send;
    // var sent = false;
    // res.send = function(data){
        // if(sent) return;
        // _send.bind(res)(data);
        // sent = true;
    // };
    // next();
// })


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//every route goes to index  except declared
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'angular-cli/src/index.html'));
   res.sendFile(path.join(__dirname, 'public/index.html')); 
});


// Start Server
app.listen(port, ()=> {
	console.log('Server started on port '+port);
});