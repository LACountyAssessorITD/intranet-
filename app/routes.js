module.exports = function(app, mysql, passport, transporter) {
//module.exports = function(app,passport) {
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	// frontend routes =========================================================
	// route to handle all angular requests
	function isAuthenticated(req, res, next) {
		// do any checks you want to in here
		// CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
		// you can do this however you want with whatever variables you set up
		if (req.isAuthenticated()){
			console.log("Authenticated");
			next();
		}else{
			req.session.returnTo = req.path;
			console.log("Not Authenticated");
			res.redirect('/login');
			//next();
		}
		// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	};

	function testConn(){
		var connection = mysql.createConnection({
		  host     : 'uscitp.com',
		  user     : 'tastleonar',
		  password : 'uscitp2016',
		  database : 'tastleon_intranet'
		});
		return connection
	}


	app.post('/login',passport.authenticate('WindowsAuthentication', {

		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash:    false }));

	app.get('/loggedin', function(req,res){
		console.log(req.user);
		 res.send(req.isAuthenticated() ? req.user: '0');
		//res.send('apple');

	});

	app.get('/login', function(req,res){
		res.sendfile('./public/login.html');
	})

	app.post('/get_apps', function (req, res) {
		//store data from DB upon successful response.
		var data_received;

		//Open up the sql connection and send query.
		var myConn = testConn();
		var sql = 'SELECT * FROM Apps ORDER BY `name` ASC';
		sql = mysql.format(sql);
		myConn.query(sql, function(err, rows, fields) {
			if (err){
				console.log(err);
				throw err;
			}
			// Save the first result from query into received data.
			data_received = rows;
			//close the connection and send the data convert array to json.
			myConn.end();
			res.send(JSON.stringify(data_received));
		});
	});

	app.post('/get_announcement', function (req, res) {
		//store data from DB upon successful response.
		var data_received;

		//Open up the sql connection and send query.
		var myConn = testConn();
		var payload =req.body.division_id;
		var sql = 'SELECT * FROM Announcements WHERE division_id = ? ORDER BY date_created DESC LIMIT 1';
		var inserts = [payload];
		sql = mysql.format(sql, inserts);
		myConn.query(sql, function(err, rows, fields) {
			if (err){
				console.log(err);
				throw err;
			}
			// Save the first result from query into received data.
			data_received = rows[0];
			//close the connection and send the data convert array to json.
			myConn.end();
			res.send(JSON.stringify(data_received));
		});
	});

	app.post('/get_page', function (req, res){
		//console.log("retrieving page "+req.body.page_id);
		//the received data is in *req*. access by >req.body.{{variable name sent}}

		var page_data_received; //store response data from DB here.
		var myConn = testConn(); //open up the connection and send query

		myConn.query('SELECT * FROM Pages WHERE id = '+req.body.page_id, function(err, rows, fields) {
			if (err){
				console.log(err);
				throw err;
			}
			page_data_received = rows[0]; //store the first row from result.
			//close connection and send back data as JSON
			myConn.end();
			res.send(JSON.stringify(page_data_received));
		});
	});

	app.post('/get_page_from_name', function (req, res){
		/*
		*console.log("retrieving page "+req.body.page_id);
		*the received data is in *req*. access by >req.body.{{variable name sent}}
		*receive the name.
		*query the database for the first result of page
		*this means that each page name has to be unique as well. *** TODO
		*given the first result from the query , we get entire page's data.
		*we send this data back as the response.
		*/


		var page_data_received; //store response data from DB here.
		var myConn = testConn(); //open up the connection and send query

		var payload =req.body.page_name;
		var sql = 'SELECT * FROM `Pages` WHERE `url` = ? LIMIT 1';
		var inserts = [payload];
		sql = mysql.format(sql, inserts);
		console.log(sql);
		myConn.query(sql, function(err, rows, fields) {
			if (err){
				console.log(err);
				console.log(err.fatal);
				throw err;
			}
			if (rows.length > 0){
				page_data_received = rows[0]; //store the first row from result.
			}else{
				res.send({'status':-1});
				//res.redirect('/');
			}
			//close connection and send back data as JSON
			myConn.end();
			res.send(JSON.stringify(page_data_received));
		});
	});

	app.post('/update_page', function(req,res){
		//console.log("test"+req.body.theme);
		var myConn = testConn(); //opens up connection
		var payload =
		{
			'img_01' : req.body.img_01,
			'img_02' : req.body.img_02,
			'img_03' : req.body.img_03,
			'heading_01' : req.body.heading_01,
			'heading_02' : req.body.heading_02,
			'body_01' : req.body.body_01,
			'body_02' : req.body.body_02,
			'video_01' : req.body.video_01,
			'video_02' : req.body.video_02,
			'name' : req.body.name,
			'theme': req.body.theme,
			'url' : req.body.url
		}

		var sql = 'UPDATE Pages SET ? WHERE id= ?'
		var inserts = [payload, req.body.id];
		sql = mysql.format(sql, inserts);
		console.log(sql);
		myConn.query(sql , function(err,result){
				  if(err){
					  console.log(err);
				  }else{
					  console.log(result);
				  }
			  });
	});

	app.post('/update_announcement', function(req,res){
		//console.log("test"+req.body.theme);
		var myConn = testConn(); //opens up connection
		var payload =
		{
			'heading' : req.body.heading,
			'content' : req.body.content
		}

		var sql = 'UPDATE Announcements SET ? WHERE id= ?'
		var inserts = [payload, req.body.id];
		sql = mysql.format(sql, inserts);
		console.log(sql);
		myConn.query(sql , function(err,result){
				  if(err){
					  console.log(err);
				  }else{
					  console.log(result);
				  }
			  });
	});

	app.post('/get_alerts', function (req, res) {
		//console.log("getting");
		//store data from DB upon successful response.
		var data_received;

		//Open up the sql connection and send query.
		var myConn = testConn();

		myConn.query('SELECT type FROM Alerts',
			function(err, rows, fields) {
				if (err) {
					console.log(err);
					throw err;
				}

			// Save the first result from query into received data.
			data_received = rows;
			/*
			//console.log(rows);
			// iterate through the data and print TEST PURPOSES ONLY
			rows.forEach(function(element) {
				 console.log(element);
			});
			*/
			//close the connection and send the data convert array to json.
			myConn.end();
			res.send(JSON.stringify(data_received));
		});
	});

	app.post('/get_subscriptions', function (req, res) {
		//console.log("WHA GWAN JAMAICA");
		//console.log(req.body.email);
		//var email = "'" + req.body.email + "'";
		var email = req.body.email;
		//Open up the sql connection and send query.
		var data_received;
		var myConn = testConn();
		myConn.query("SELECT alertType FROM AlertGroups where userEmail = " + mysql.escape(email),
			function(err, data_received, fields) {
				if (err) {
					console.log(err);
					throw err;
				}

			//console.log(data_received);
			/*
			// iterate through the data and print TEST PURPOSES ONLY
			rows.forEach(function(element) {
				 console.log(element);
			});
			*/

			//close the connection and send the data convert array to json.
			myConn.end();
			res.send(JSON.stringify(data_received));
		});
	});


	app.post('/subscribe', function (req, res) {
		//console.log(req.body);
		//var email = "'" + req.body.email + "'";
		var email = req.body.email;
		var myConn = testConn();

		// Delete all previous db entries matching user email to alert subscription type
		myConn.query("DELETE FROM AlertGroups WHERE userEmail = " + mysql.escape(email),
			function(err, result) {
				if (err) {
					//console.log(err);
					throw err;
				}
				console.log('Deleted ' + result.affectedRows + ' rows');
		});

		req.body.alerts.forEach(function(element) {
			 var subscription = { alertType: element, userEmail: email };
			 console.log(subscription);
			 myConn.query('INSERT INTO AlertGroups SET ?', subscription,
	 			function(err, result) {
	 			  if(err) {
						console.log(err);
						throw err;
					}
					console.log('Succesfully inserted:', subscription);
	 		});
		});

		//close the connection and send the data convert array to json.
		myConn.end();
		res.send(JSON.stringify({'good':200}));
	});



	app.post('/submit_alert', function (req, res) {
		console.log(req.body.to);
		console.log(req.body.subject);
		console.log(req.body.body);

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    sender: 'nroubal@usc.edu', // sender address
		    to: req.body.to, // list of receivers
		    subject: req.body.subject, // Subject line
		    text: req.body.body, // plaintext body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info) {
		    if(error) {
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
		res.send(JSON.stringify({'good':200}));
	});




	/*
	app.get('/',isAuthenticated, function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/*',isAuthenticated, function(req, res) {
		res.sendfile('./public/index.html');
	});
	*/


	// app.all('/*', isAuthenticated,function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });



};
