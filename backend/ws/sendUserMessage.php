<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/MailerModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $userId = $request->userId;
    $message = $request->message;
    $destinatary = $request->email;
    $subject = $request->subject;

    $mailer = new Mailer($destinatary);
    $isSent = $mailer->sendEmail($userId, $message, $subject);

    print_r ($isSent);
?>