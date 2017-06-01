<?php
require ("../db_config.php");


$persona_id = $_POST['persona_id'];
$nombre 	= $_POST['nombre'];
$apellido 	= $_POST['apellido'];
$nacimiento = $_POST['nacimiento'];
$telefono 	= $_POST['telefono'];
$correo 	= $_POST['correo'];
$user 		= $_POST['user_id'];
$activo 	= 1;

//Añado la consulta
$sql="INSERT INTO personas (id, nombre, apellido, fnacimiento, telefono, correo, user_id, activo) VALUES ('".$persona_id."', '".$nombre."', '".$apellido."', '".$nacimiento."', '".$telefono."', '".$correo."', '".$user."', '".$activo."');";
//echo $sql;
$result = mysqli_query($con, $sql);

if ($result) {
	echo "ok";
}

//Cierro
mysqli_close($con);

?>