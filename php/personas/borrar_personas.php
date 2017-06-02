<?php
require ("../db_config.php");

@$id = $_GET["id"];
$var = array();

if (empty($id)){
	echo "no llega";
	die;
}
else {
	$sql = "UPDATE personas
			SET activo=0 
			WHERE id ='".$id."';";

}

$result = mysqli_query($con, $sql);



	//echo '{"alumnos":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	//die;

