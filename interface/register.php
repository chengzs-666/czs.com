<?php
   
    include('./library/conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $age = $_REQUEST['age'];
    $sex = $_REQUEST['sex'];
    $phone = $_REQUEST['phone'];
    $email = $_REQUEST['email'];
    $address = $_REQUEST['address'];

    echo "$username $password $age $sex $phone $email $address";

    $sql = "select * from users where username='$username'";
    
    $result = $mysqli->query($sql);
    
    if($result->num_rows>0){
        echo "<script>alert('用户名已存在')</script>";
        echo "<script>location.href='../src/html/register.html'</script>";
        $mysqli->close();
        die();
    }
    $insertsql = "insert into users(username,userpassword,age,sex,phone,email,address)values('$username','$password',$age,$sex,$phone,'$email','$address')";

    $res = $mysqli->query($insertsql);

    if($res){
        echo "<script>alert('注册成功')</script>";
        echo "<script>location.href='../src/html/login.html'</script>";
    }else{
        echo '<script>alert("注册账号失败,请重新注册")</script>';
        echo "<script>location.href='../src/html/register.html'</script>";
    }
    
?>