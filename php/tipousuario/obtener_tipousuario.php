<?php
require ("../db_config.php");

$nombre = $_GET["tipousuario"];
$var = array();

if (empty($nombre)){
	$sql = "SELECT * FROM tipousuario ORDER BY nombre;";
}
else {
	$sql = "SELECT id as tipousuario_id,nombre FROM tipoUsuario
	 	where nombre ='".$nombre."';";
}

	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"tipousuario":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	die;

