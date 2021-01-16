<?php
    
    $mysql_config = array(
        'host'=>'127.0.0.1:3306',
        'db_user'=>'root',
        'db_password'=>'root',
        'db'=>'czs.mi.com'
    );

    $mysqli = @new mysqli($mysql_config['host'],$mysql_config['db_user'],$mysql_config['db_password']);
    
    if($mysqli->connect_errno){
        die('连接错误'.$mysqli->connect_errno);
    }
    
    $mysqli->query('set name utf8');
    
    $select_db = $mysqli->select_db($mysql_config['db']);
    
    if(!$select_db){
        die('数据库连接错误'.$mysqli->connect_error);
    }
?>