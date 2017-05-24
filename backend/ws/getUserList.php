<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/UserModel.php');

    $user = new User();

    print_r(
        json_encode($user->getUserList())
    );
?>