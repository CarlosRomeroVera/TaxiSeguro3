<?php
require ("../db_config.php");

@$user_id = $_GET["id"];
$var = array();

if (empty($user_id)){
	//$sql = "SELECT id AS persona_id, nombre, apellido FROM personas WHERE activo=1 ORDER BY nombre;";
}
else {
	$sql = "SELECT id as persona_id, nombre, apellido, fnacimiento, user_id, foto, telefono, correo, created FROM personas
	 	where user_id ='".$user_id."';";
}

	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"personas":'.json_encode($var).'}';

//Cierro
mysqli_close($con);

?>
