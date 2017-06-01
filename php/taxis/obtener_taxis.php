<?php
require ("../db_config.php");

@$taxi_id = $_GET["id"];
$var = array();

if (empty($taxi_id)){
	$sql = "SELECT id AS taxi_id, num_taxi, placas, modelo, anio, activo, created, modified FROM taxis WHERE activo = 1 ORDER BY num_taxi;";
}
else {
	$sql = "SELECT id as taxi_id, num_taxi, placas, modelo, anio, activo, created, modified FROM taxis
	 	where id ='".$taxi_id."';";
}

	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"taxis":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	die;

?>