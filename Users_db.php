<?php

$host = "localhost";
$dbname = "Users";
$username = "root";
$password = "School\$Project1";

/*$mysqli = new mysqli(hostname: $host, 
                     username: $username, 
                     password: $password, 
                     database: $dbname);
*/
$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli -> connect_errno) {
    die("Conenct error: " . $mysqli -> connect_errno);
}


return $mysqli;

?>
