<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];
$viaje_id = $_POST['viaje_id'];
$calificacion = $_POST['calificacion'];

$sql = "SELECT chofer_id,pasajero_id FROM viajes where id ='".$viaje_id."'";
$result = mysqli_query($con, $sql);
if ($result) {
	$row=mysqli_fetch_row($result);
	$sql="INSERT INTO calificaciones (id, calificador, calificado, viaje_id, calificacion) VALUES ('".$id."', '".$row[0]."', '".$row[1]."', '".$viaje_id."', '".$calificacion."')";
	$result = mysqli_query($con, $sql);
	if ($result) {
		$sql="UPDATE chofer 
		  SET estado_chofer = 'libre'
		  WHERE id = '".$row[0]."';";
		$result = mysqli_query($con, $sql);
		if ($result) {
			echo true;
		}else{
			echo "Error";
		}
	}else{
		echo "Error";
	}
}else{
	echo "Error";
}

//Cierro
mysqli_close($con);

?>