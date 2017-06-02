<?php
require ("../db_config.php");

@$persona_id = $_GET["id"];
$var = array();

if (empty($persona_id)){
	$sql = "SELECT id AS persona_id, nombre, apellido FROM personas WHERE activo=1 ORDER BY nombre;";
}
else {
	$sql = "SELECT id as persona_id, nombre, apellido, fnacimiento as nacimiento, telefono, correo, activo, created, modified FROM personas
	 	where id ='".$persona_id."';";
}

	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"personas":'.json_encode($var).'}';

//Cierro
mysqli_close($con);

?>
