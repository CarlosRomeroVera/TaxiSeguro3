<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT id,viaje_inicio,monto_final,viaje_fin,estado_viaje_id,chofer_id FROM viajes where id ='".$id."'";
$result = mysqli_query($con, $sql);
if ($result) {
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"viaje":'.json_encode($var).'}';
}else{
	echo 'Error';
}


//Cierro
mysqli_close($con);

?>