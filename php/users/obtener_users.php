<?php
require ("../db_config.php");

@$user_id = $_GET["id"];
$var = array();

if (empty($user_id)){
	$sql = "SELECT id AS user_id, usuario, contrasenia, activo, tipousuario_id, online, created, modified FROM users ORDER BY usuario, activo;";
}
else {
	$sql = "SELECT id as user_id, usuario, contrasenia, activo, tipousuario_id, online, created, modified FROM users
	 	where id ='".$user_id."';";
}

	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"users":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	die;

