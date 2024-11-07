<?php

if (empty($_POST["user"]) OR empty($_POST["psw"])){
    die ("User Name and Password required");
}


if (strlen($_POST["psw"]) < 8){
    die("Passwords must be at least 8 characters");
}

if ($_POST["psw"] !== $_POST["psw-repeat"]){
    die("Passwords must match");
}

$psw_hash = password_hash($_POST["psw"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "../Users_db.php";

$sql = "INSERT INTO user_account (user_name, user_password)
        VALUES (?, ?)";

$stmt = $mysqli -> stmt_init();

if(! $stsmt -> prepare($sql)){
    die("SQL error: " . $mysqli->error);
}
// ss -> string, string
$stmt -> bind_param("ss",
                    $_POST["user_name"],
                    $_POST["user_password"]);

if ($stmt -> execute()){
    
    header("Location: ../user-file/user-index.html");

 } 
 else {
    if ($mysqli->errno == 1062){
        die("Username already taken");
    }
    else{
        die($mysqli->error . " " . $mysqli->errno);
    }
}



?>