<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    require_once('../models/EntryModel.php');

    // Getting POST data
    $title = $_POST['title'];
    $fk_user = $_POST['author'];
    $image = $_FILES['image'];
    $post = $_POST['post'];

    if($title !== null && $fk_user !== null && $image !== null && $post !== null){
        // Instantiating Entry Model and getting all entries
        $entry = new Entry();
        $inserted = $entry->addEntry($title, $fk_user, $image, $post);
        echo ($inserted === true) ? "true" : $inserted;
    }else echo "false";
?>