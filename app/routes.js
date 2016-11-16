module.exports = function(app, mysql, transporter) {
//module.exports = function(app,passport) {
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	// app.post('/login',
 	//passport.authenticate('WindowsAuthentication', {
    //                               successRedirect: '/ipassed',
    //                               failureRedirect: '/failure',
    //                               failureFlash:    true })
	// 						  );
	//

	function testConn(){
		var connection = mysql.createConnection({
		  host     : 'uscitp.com',
		  user     : 'tastleonar',
		  password : 'uscitp2016',
		  database : 'tastleon_intranet'
		});
		return connection
	}

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
		var sql = 'SELECT * FROM Pages WHERE url = ? LIMIT 1';
		var inserts = [payload];
		sql = mysql.format(sql, inserts);
		console.log(sql);
		myConn.query(sql, function(err, rows, fields) {
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

	app.get('/*', function(req, res) {
		res.sendfile('./public/index.html');
	});



};
