<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql="UPDATE viajes 
	  SET estado_viaje_id = 'Aceptado'
	  WHERE id = '".$id."';";
$result = mysqli_query($con, $sql);
if ($result) {
	$sql = "SELECT chofer_id FROM viajes where id ='".$id."'";
	$result = mysqli_query($con, $sql);
	$row=mysqli_fetch_row($result);
	$sql="UPDATE chofer 
	  SET estado_chofer = 'En viaje'
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

//Cierro
mysqli_close($con);

?>