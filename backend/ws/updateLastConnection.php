<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/UserModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $userId = $request->id;

    if($userId !== null){
        $user = new User();
        echo ($user->updateLastConnection($userId)) ? "true" : "false";
    }else echo "false";
?>