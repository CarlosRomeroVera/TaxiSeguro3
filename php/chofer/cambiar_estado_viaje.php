<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];
$estado = $_POST['estado'];

$sql="UPDATE viajes 
	  SET estado_viaje_id = '".$estado."'
	  WHERE id = '".$id."';";
$result = mysqli_query($con, $sql);
if ($result) {
	echo true;
}else{
	echo "Error, intenta de nuevo.";
}

//Cierro
mysqli_close($con);

?>