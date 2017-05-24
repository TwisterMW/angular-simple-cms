<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    require_once('../models/UserModel.php');
    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $mail = $request->mail;
    $userId = $request->userId;

    $user = new User();
    echo ($user->changeMail($mail, $userId)) ? "true" : "false";
?>