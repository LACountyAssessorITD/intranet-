// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql          = require('mysql');


// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public/index.html')); // set the static files location /public/img will be /img for users

// var passport = require('passport');
// var WindowsStrategy = require('passport-windowsauth');
//
// passport.use(new WindowsStrategy({
//   ldap: {
//     url:             'ldap://!',
//     base:            '!',
//     bindDN:          '!@!',
//     bindCredentials: '!!'
//   },
//   integrated:      false
// }, function(profile, done){
//   console.log(profile);
//   done(profile);
//   // User.findOrCreate({ waId: profile.id }, function (err, user) {
// 	//   console.log(user);
//     //  done(err, profile);
//   //
//   // });
// }));
//
var connection = mysql.createConnection({
  host     : 'uscitp.com',
  user     : 'tastleonar',
  password : 'uscitp2016',
  database : 'tastleon_intranet'
});


// routes ==================================================
//require('./app/routes')(app,passport); // pass our application into our routes

require('./app/routes')(app, mysql); // pass our application into our routes


// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
