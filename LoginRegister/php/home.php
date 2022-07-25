<?php

include "config.php";

$user = new stdClass();
    session_start();

    $user->fname = $_SESSION['fname'];
    $user->lname = $_SESSION['lname'];
    $user->email = $_SESSION['email'];
    $user->password = $_SESSION['password'];
    $user->mobile = $_SESSION['mobile'];
    $user->dob = $_SESSION['dob'];

    $myJSON = json_encode($user);
            
    echo $myJSON;
   
    $_SESSION['profileData'] = $myJSON;

    

?>