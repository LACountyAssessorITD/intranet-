module.exports = function(app) {
//module.exports = function(app,passport) {


	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	// app.post('/login',
 //  	passport.authenticate('WindowsAuthentication', {
    //                               successRedirect: '/ipassed',
    //                               failureRedirect: '/failure',
    //                               failureFlash:    true })
	// 						  );
	//

	/*This post request is not working properly given i still get a
	* 500 error when the /intranet/public/dbaccess files are requested.
	*/
	app.post('/dbaccess/hr-ann-get.php', function (req, res) {
		console.log("posting");
		res.sendfile(res);
	});

};
