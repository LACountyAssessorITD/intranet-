<?php

// $data = json_decode(file_get_contents("php://input"));
// $division = $data->division_name;
//
// date_default_timezone_set('America/Los_Angeles');
// $date_announcement =date('Y-m-d H:i:s');
//

// 1. Establish MySQL Connection
$host = 'uscitp.com';
$user = 'tastleonar'; // TODO: Your user info
$pass = 'uscitp2016'; // TODO: Your pass info
$db = 'tastleon_intranet'; // TODO: Your db info

$conn = mysqli_connect($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
	exit("MySQL Connection Error: " . mysqli_connect_error());
}
// 2. Generate & Submit
//SQL GET THE MOST RECENT ANNOUNCEMENT
$sql = "SELECT heading, body, photo_link, video_link, pure_html
            FROM HRsrc
			WHERE id = 1";

$results = mysqli_query($conn, $sql);
if (!$results) {
	exit("Insert SQL Error: " . mysqli_error($conn));
}
//$obj = mysqli_fetch_object($results)
$row = mysqli_fetch_array($results);

// var_dump($row);
PRINT json_encode($row);
