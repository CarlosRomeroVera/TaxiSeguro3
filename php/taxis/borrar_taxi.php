<?php
require ("../db_config.php");

@$id = $_GET["id"];
$var = array();

if (empty($id)){
	echo "no llega";
	die;
}
else {
	/*$sql = "DELETE
			FROM taxis
			WHERE id ='".$id."';";*/

	$sql = "UPDATE taxis
			SET activo='0'
			WHERE id ='".$id."';";

}

$result = mysqli_query($con, $sql);



	//echo '{"alumnos":'.json_encode($var).'}';
	//echo '"alumnos":'.json_encode($var);
	//die;
?>