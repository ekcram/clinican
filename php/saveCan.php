<?php

require_once "connection.php";


$chip = $_POST['chip'];
$nomPer = $_POST['nombre'];
$fechaN = $_POST['fechaN'];
$raza = $_POST['raza'];
$cli=$_POST['cli'];


$jsondata = array();

$sql = "INSERT INTO perros VALUES('$chip','$nomPer','$fechaN','$raza','$cli')";

$respuesta=$connection->query($sql);
 if(!$respuesta){
    $jsondata["mensaje"]="Error";
 };
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);

$connection->close();
exit();

