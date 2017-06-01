<?php
require ("../db_config.php");

@$user_id = $_GET["id"];


if (empty($user_id)){
	echo "no llega";
	die;
}
else {

	//$sql = "DELETE FROM personas WHERE personas.id ='".$user_id."';";
	$sql = "UPDATE users SET users.activo = 0 WHERE users.id = '".$user_id."';";
	$result = mysqli_query($con, $sql);
}





	//echo '{"alumnos":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	//die;

