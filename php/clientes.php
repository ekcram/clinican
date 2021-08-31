<?php

require_once "connection.php";

$jsondata = array();

$sql="SELECT dni, nomApe FROM clientes order by nomApe";

if ($result = $connection->query($sql)) {
    
    while ($row = $result->fetch_object()) {
        $jsondata["datos"][] = $row;
       
    }
}
 
$result->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);



exit();