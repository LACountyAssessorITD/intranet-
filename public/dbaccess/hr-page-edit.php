<?php
 $data = json_decode(file_get_contents("php://input"));
$page_heading = $data->heading;
$page_body = $data->body;
$page_photo = $data->photo_link;
$page_video = $data->video_link;
$page_html = $data->pure_html;


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
$sql = "UPDATE HRsrc
      SET heading= '$heading_announcement',
      body = '$content_announcement',
      photo_link = '$page_photo',
      video_link = '$page_video',
      pure_html = '$page_html'
      WHERE id= 1";
PRINT $sql;


$results = mysqli_query($conn, $sql);
if (!$results) {
	exit("Insert SQL Error: " . mysqli_error($conn));
}


PRINT "Your information has been successfully updated.";
