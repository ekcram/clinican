<?php

require_once "connection.php";


$cliente = $_POST['cliente'];




$jsondata = array();

$sql="SELECT * FROM `perros` WHERE dueno='$cliente'";
if ($result = $connection->query($sql)) {
   
    while ($row = $result->fetch_object()) {
        $jsondata["datos"][] = $row;
    }
}
$result->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);

$connection->close();

exit();

?>
