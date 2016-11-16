// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql          = require('mysql');
var nodemailer     = require('nodemailer');


// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');

passport.use(new WindowsStrategy({
ldap: {
    url:             'ldap://laassessor.co.la.ca.us',
    base:            'OU=ASSR,DC=laassessor,DC=co,DC=la,DC=ca,DC=us',
    bindDN:          'bsg_ldap@laassessor',
    bindCredentials: 'SharePoint123!'
  },
  integrated:      false
}, function(profile, done){
  console.log(profile);
  done(profile);
  // User.findOrCreate({ waId: profile.id }, function (err, user) {
	//   console.log(user);
    //  done(err, profile);
  //
  // });
}));

var connection = mysql.createConnection({
  host     : 'uscitp.com',
  user     : 'tastleonar',
  password : 'uscitp2016',
  database : 'tastleon_intranet'
});

// nodemailer ==================================================
// Set up transporter object (with defaults) to send emails
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'assessorintranet@gmail.com',
      pass: 'usccsci401'
    }
});


// routes ==================================================
//require('./app/routes')(app,passport); // pass our application into our routes

require('./app/routes')(app, mysql,passport, transporter); // pass our application into our routes


// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
