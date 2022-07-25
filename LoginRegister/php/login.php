<?php

include "config.php";

$email=$_POST["email"];
$password=$_POST["password"];
$passwordhash=md5($password);

$stmt=$conn->prepare("SELECT * FROM user_new WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$result=$stmt->get_result();

if($result->num_rows > 0){

    while($row=$result->fetch_assoc()){

        $email=$row['email'];
        $cpassword=$row['password'];
        $fname=$row['fname'];
        $lname=$row['lname'];
        $mobile=$row['mobile'];
        $dob=$row['dob'];
        $id=$row['id'];

        if($cpassword===$passwordhash){
            session_start();
    
            $_SESSION['id'] = $id;
            $_SESSION['fname'] = $fname;
            $_SESSION['lname'] = $lname;
            $_SESSION['email'] = $email;
            $_SESSION['password'] = $password;
            $_SESSION['mobile'] = $mobile;
            $_SESSION['dob'] = $dob;

            echo json_encode(['status' => 'success']);
        }
        else{
            echo json_encode(['status' => 'passError']);
        }
    }
}else{
    echo json_encode(['status' => 'emailError']);
}    
$stmt->close();  
?>





