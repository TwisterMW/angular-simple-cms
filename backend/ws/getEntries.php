<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once('../models/EntryModel.php');

    // Instantiating Entry Model and getting all entries
    $entryList = new Entry();

    print_r(
        json_encode($entryList->getAllEntries())
    );
?>