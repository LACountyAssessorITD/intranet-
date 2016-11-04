<?php
 $data = json_decode(file_get_contents("php://input"));
$heading_announcement = $data->title_ann;
$content_announcement = $data->content_ann;

date_default_timezone_set('America/Los_Angeles');
$date_announcement =date('Y-m-d H:i:s');


// 1. Establish MySQL Connection
$host = 'uscitp.com';
$user = 'tastleonar'; // TODO: Your user info
$pass = 'uscitp2016'; // TODO: Your pass info
$db = 'tastleon_intranet'; // TODO: Your db info

$conn = mysqli_connect($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
	exit("MySQL Connection Error: " . mysqli_connect_error());
}

// 2. Generate & Submit SQL
$sql = "INSERT INTO Announcements (heading,content,date_created)
    VALUES ('$heading_announcement','$content_announcement','$date_announcement' )";
PRINT $sql;
$results = mysqli_query($conn, $sql);
if (!$results) {
	exit("Insert SQL Error: " . mysqli_error($conn));
}
PRINT "Your information has been successfully added to the database.";
