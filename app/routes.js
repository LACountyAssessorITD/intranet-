module.exports = function(app, mysql) {
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
			 rows.forEach(function(element){
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
		console.log(req.body.alert.subject);
    res.end();
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});



};
