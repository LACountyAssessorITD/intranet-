<?php
 $data = json_decode(file_get_contents("php://input"));
$ann_id = $data->ann_idx_id;

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
$sql = "DELETE FROM Announcements
				WHERE id = $ann_id";

PRINT $sql;


$results = mysqli_query($conn, $sql);
if (!$results) {
	exit("Insert SQL Error: " . mysqli_error($conn));
}


PRINT $data;
