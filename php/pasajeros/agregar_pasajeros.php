<?php
require ("../db_config.php");

$pasajero_id = $_POST['pasajero_id'];
$persona_id = $_POST['persona_id'];

//Añado la consulta
$sql="INSERT INTO pasajero (id, persona_id) VALUES ('".$pasajero_id."', '".$persona_id."');";
echo $sql;


$result = mysqli_query($con, $sql);

//Cierro
mysqli_close($con);