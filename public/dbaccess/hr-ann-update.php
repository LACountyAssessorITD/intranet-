<?php
 $data = json_decode(file_get_contents("php://input"));
$heading_announcement = $data->title_ann;
$content_announcement = $data->content_ann;
$ann_id = $data->ann_idx_id;

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
$sql = "UPDATE Announcements
      SET heading= '$heading_announcement',
      content= '$content_announcement'
      WHERE id = $ann_id" ;
PRINT $sql;


$results = mysqli_query($conn, $sql);
if (!$results) {
	exit("Insert SQL Error: " . mysqli_error($conn));
}


PRINT "Your information has been successfully updated.";
