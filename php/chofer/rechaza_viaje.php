<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql="UPDATE viajes 
	  SET estado_viaje_id = 'Rechazado'
	  WHERE id = '".$id."';";
$result = mysqli_query($con, $sql);
if ($result) {
	echo true;
}else{
	echo "Error en la red, verificala de inmediato.";
}

//Cierro
mysqli_close($con);

?>