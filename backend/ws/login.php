<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/UserModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $username = $request->username;
    $password = $request->password;

    if($username !== null && $password !== null){
        // Instantiating User Model and checking if user is valid
        $user = new User($username, $password);

        $isUser = $user->isUser();
        if($isUser !== false){
            $user->setCookie();

            echo json_encode($isUser);
        }else echo "false";
    }else echo "false";
?>