<?php
require ("../db_config.php");



$nombre 	= $_POST['nombre'];
$apellido 	= $_POST['apellido'];
$nacimiento = $_POST['nacimiento'];
$telefono 	= $_POST['telefono'];
$correo 	= $_POST['correo'];
$user 		= $_POST['user_id'];

//Añado la consulta
$sql="UPDATE personas 
		SET nombre = '".$nombre."', apellido = '".$apellido."', fnacimiento = '".$nacimiento."', telefono = '".$telefono."', correo = '".$correo."', modified = NOW() 
		WHERE user_id = '".$user."';";
echo $sql;


$result = mysqli_query($con, $sql);

//Cierro
mysqli_close($con);

?>