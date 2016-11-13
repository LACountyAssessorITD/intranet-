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

	/*This post request is not working properly given i still get a
	* 500 error when the /intranet/public/dbaccess files are requested.
	*/

	function testConn(){
		var connection = mysql.createConnection({
		  host     : 'uscitp.com',
		  user     : 'tastleonar',
		  password : 'uscitp2016',
		  database : 'tastleon_intranet'
		});

		return connection
	}
	app.post('/dbaccess/hr-ann-get.php', function (req, res) {
		console.log("posting");
		res.sendfile(res);
	});

	app.post('/test_endpoint', function (req, res) {
		console.log("getting");
		var dataReceived;
		//connection.connect();
		var myConn = testConn();
		myConn.query('SELECT * FROM Announcements', function(err, rows, fields) {
		  if (err){
			  console.log(err);
			throw err;
		  }

		 // console.log('The solution is: ', rows[0]);
		 dataReceived = rows[0];
		 rows.forEach(function(element){
			 console.log(element);
		 });
		  myConn.end();
		 res.send(JSON.stringify(dataReceived));
		});
	});

	app.post('/get_page', function (req, res){
		console.log("retrieving page "+req.body.page_id);
		var pageContentReceived;
		var myConn = testConn();
		myConn.query('SELECT * FROM Pages WHERE id = '+req.body.page_id, function(err, rows, fields) {
		//res.send("grateful for your service");
		//myConn.query('SELECT * FROM ')


		if (err){
			console.log(err);
		  throw err;
		}

	   // console.log('The solution is: ', rows[0]);
	   pageContentReceived = rows[0];
	//    rows.forEach(function(element){
	// 	   console.log(element);
	//    });
		myConn.end();
	   res.send(JSON.stringify(pageContentReceived));
   	});
   });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
