<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    require_once('../models/EntryModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $entryId = $request->id;

    if($entryId !== null){
        $entry = New Entry($entryId, true);
        echo ($entry) ? "true" : "false";
    }else echo "false";
?>