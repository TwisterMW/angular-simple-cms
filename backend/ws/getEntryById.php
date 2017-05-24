<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/EntryModel.php');

    // Getting POST data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $entryId = $request->id;

    if($entryId !== null){
        // Instantiating Entry Model and getting all entries
        $entryModel = new Entry($entryId);
        $entry = $entryModel->getEntryById();

        if($entry !== false){
            print_r(
                json_encode($entry)
            );
        }else{
            echo "false";
        }
    }else echo "false";
?>