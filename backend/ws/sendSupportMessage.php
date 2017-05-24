<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/MailerModel.php');
    $mailer = new Mailer();

    if(isset($_FILES['image'])){
        $userId = $_POST['userId'];
        $message = $_POST['message'];
        $image = $_FILES['image'];

        $isSent = $mailer->sendEmail($userId, $message, $image);
    }else{
        // Getting POST data
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);

        $userId = $request->userId;
        $message = $request->message;

        $isSent = $mailer->sendEmail($userId, $message);
    }

    print_r ($isSent);
?>