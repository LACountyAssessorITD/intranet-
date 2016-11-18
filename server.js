// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql          = require('mysql');
var nodemailer     = require('nodemailer');
var passport        = require('passport');
var WindowsStrategy = require('passport-windowsauth');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// get all data/stuff of the body (POST) parameters
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(session({secret: 'keyboard*ninja',
                    saveUninitialized: true,
                 resave: true}));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new WindowsStrategy({
ldap: {
    url:             'ldap://laassessor.co.la.ca.us',
    base:            'OU=ASSR,DC=laassessor,DC=co,DC=la,DC=ca,DC=us',
    bindDN:          'bsg_ldap@laassessor',
    bindCredentials: 'SharePoint123!'
  },
  integrated:      false
}, function(profile, done){
  //console.log(profile);
  if(profile != null){
    console.log(JSON.stringify(profile));
    var userjson = profile;
    var user = {
      'emp_num' : userjson._json.employeeNumber
    };
    console.log("SUCCESSFULLY authed. But still have to redirect");
    done(null,userjson._json.employeeNumber);
  }else{
    done(null,false);
  }
}));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tastleonar',
  password : '#Assessor%usc&1067',
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
