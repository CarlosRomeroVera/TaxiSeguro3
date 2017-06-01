<?php
require ("../db_config.php");


//Nombro variables con metodo POST
$user_id        = $_POST['user_id'];
$usuario 	    = $_POST['usuario'];
$contrasenia 	= password_hash($_POST['contrasenia'], PASSWORD_DEFAULT);
$tipousuario_id = $_POST['tipousuario'];
$online = 0;
//Añado la consulta
$sql="INSERT INTO users (id, usuario, contrasenia, tipousuario_id, online) VALUES ('".$user_id."', '".$usuario."', '".$contrasenia."','".$tipousuario_id."', '".$online."');";
echo $sql;
$result = mysqli_query($con, $sql);


mysqli_close($con);

?>