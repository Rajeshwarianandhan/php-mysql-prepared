<?php
    
    include "config.php";

    $fname=$_POST["fname"];
    $lname=$_POST["lname"];
    $email=$_POST["email"];
    $password=$_POST["password"];
    $passwordhash=md5($password);
    $mobile=$_POST["mobile"];
    $dob=$_POST["dob"];

    $stmt=$conn->prepare("SELECT email FROM user_new WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $stmt->store_result();
    
    if($stmt->num_rows > 0){
    
        $stmt->bind_result($email);
        $stmt->fetch();
        $stmt->close();
        
        echo json_encode(['status'=>'error']);
    
    }else{

        $stmt = $conn->prepare("INSERT INTO user_new (fname,lname,email,password,mobile,dob)
        VALUES (?,?,?,?,?,?)");
   
        $stmt->bind_param("ssssss",$fname,$lname,$email,$passwordhash,$mobile,$dob);
   
        if($stmt->execute()){
   
           echo json_encode(['status'=>'success']);
   
        }else{
   
            echo "Something wrong";   
   
        }
    } 
    $stmt->close();
   
?>