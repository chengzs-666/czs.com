<?php
    include('./library/conn.php');

    $ids = $_REQUEST['ids'];
    
    $sql = "select * from product where id in ($ids)";
  
    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;
    
?>