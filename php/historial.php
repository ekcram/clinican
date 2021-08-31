<?php
require_once "connection.php";

$chip = $_POST['chip'];

$jsondata = array();

$sql="SELECT fecha, hora, observaciones FROM consultas WHERE chip='$chip' ORDER BY fecha;";

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

