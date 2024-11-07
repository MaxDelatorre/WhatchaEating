<?php
$is_invalid = false;

if (empty($_POST["user"]) OR empty($_POST["psw"])){
    die ("User Name and Password required");
}

$mysqli = require __DIR__ . "../Users_db.php";

$sql = sprintf("SELECT * FROM user_account
        WHERE user_name = '%s",
        $mysqli -> real_escape_string($_POST["user"]));

$result = $mysqli -> query($sql);

$user = $result -> fetch_assoc(); //holds user name entered

if ($user) {
    if (password_verify($_POST["psw"], $user["user_password"])) {
        header("Location: ../user-file/user-index.html");
    }
}

$is_invalid = true;

?>