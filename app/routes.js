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

	function testConn() {
		var connection = mysql.createConnection( {
		  host     : 'uscitp.com',
		  user     : 'tastleonar',
		  password : 'uscitp2016',
		  database : 'tastleon_intranet'
		});

		return connection
	}

	app.post('/get_announcement', function (req, res) {
		console.log("getting");
		//store data from DB upon successful response.
		var data_received;

		//Open up the sql connection and send query.
		var myConn = testConn();
		//WHERE id = '+req.body.division_id+'
		myConn.query('SELECT * FROM Announcements WHERE division_id = '+ req.body.division_id+' ORDER BY date_created DESC LIMIT 1',
		 function(err, rows, fields) {
			if (err){
				console.log(err);
				throw err;
			}

			// Save the first result from query into received data.
			data_received = rows[0];
		//	iterate through the data and print TEST PURPOSES ONLY
			 rows.forEach(function(element) {
				 console.log(element);
			 });

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

			// console.log('The solution is: ', rows[0]);
			page_data_received = rows[0]; //store the first row from result.
			//iterate through data, TEST PURPOSES ONLY
			//    rows.forEach(function(element){
			// 	   console.log(element);
			//    });

			//close connection and send back data as JSON
			myConn.end();
			res.send(JSON.stringify(page_data_received));
		});
	});

	app.post('/update_page', function(req,res){
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
			'name' : req.body.name
		}
		myConn.query( 'UPDATE Pages SET ? WHERE id= '+req.body.page_id, payload, function(err,result){
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

		// TODO: Get from database a list of emails that match the types

		var alertTypes = req.body.to;

		var myConn = testConn(); //open up the connection and send query

		var data_received = [];

		var query = "SELECT userEmail FROM AlertGroups WHERE alertType IN ('" + alertTypes.join("','") + "')";
		//console.log(query);
		myConn.query(query, function(err, rows, fields) {
			if (err) {
				console.log(err);
				throw err;
			}
			var row;
			for (row in rows) {
					var email = JSON.stringify(rows[row].userEmail);
					email = email.replace(/"/g,"");
					data_received.push(email);
			}
			console.log(data_received);

			//close connection and send back data as JSON
			myConn.end();
		});

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    sender: 'assessorintranet@gmail.com', // sender address
		    to: req.body.to, // list of receivers
		    subject: req.body.subject, // Subject line
		    text: req.body.body, // plaintext body
		};
/*
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info) {
		    if(error) {
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
*/
		//res.send(JSON.stringify({'good':200}));
	});

	app.get('/*', function(req, res) {
		res.sendfile('./public/index.html');
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
			//data_received = rows;

			// iterate through the data and print TEST PURPOSES ONLY
			rows.forEach(function(element) {
				 console.log(element);
			});

			//close the connection and send the data convert array to json.
			myConn.end();
			res.send(JSON.stringify(data_received));
		});
	});

	app.get('/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
