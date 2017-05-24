<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    require_once('../models/UserModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $name = $request->name;
    $email = $request->email;
    $password = md5($request->password);

    $isAdmin = (isset($request->role)) ? true : false;

    // Instantiating User Model and adding user
    if($name !== null && $email !== null && $password !== null){
        $user = new User();
        echo ($user->addUser($name, $email, $password, ($isAdmin) ? 1 : 2)) ? "true" : "false";
    }else echo "false";
?>