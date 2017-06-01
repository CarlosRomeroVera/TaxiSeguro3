<?php
require ("../db_config.php");

sleep(5);

$sql = "SELECT id,coor_actuales FROM chofer where estado_chofer = 'libre';";
$result = mysqli_query($con, $sql);
if ($result) {
	/*$result = $result->fetch_array(MYSQLI_ASSOC);
	echo json_encode($result);*/
	$var = [];
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"choferes":'.json_encode($var).'}';
}else{
	echo "Error";
}

//Cierro
mysqli_close($con);

?>