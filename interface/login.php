<?php

    include('./library/conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $selectsql = "select * from users where username='$username' and userpassword='$password'";

    $result = $mysqli->query($selectsql);
    
    if($result->num_rows){
        $row = $result->fetch_assoc();
        setcookie('username',$row['username'],time()+3600*24,'/');
        setcookie('password',$row['userpassword'],time()+3600*24,'/');
        setcookie('isLogined',true,time()+3600*24,'/');

        echo "<script>alert('登陆成功')</script>";
        echo "<script>location.href='../03.admin.php'</script>";
    }else{
        echo "<script>alert('账号或密码错误')</script>";
        echo "<script>location.href='../src/html/login.html'</script>";
    }
?>