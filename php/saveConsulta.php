<?php

require_once "connection.php";


$fecha = $_POST['fec'];
$hora = $_POST['hora'];
$observaciones = $_POST['observaciones'];
$chip = $_POST['chip'];
$vet=$_POST['vet'];


$jsondata = array();

$sql = "INSERT INTO consultas VALUES(NULL,'$fecha','$hora','$observaciones','$chip','$vet')";

$respuesta=$connection->query($sql);
 if(!$respuesta){
    $jsondata["mensaje"]="Error";
 };
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);

$connection->close();
exit();

