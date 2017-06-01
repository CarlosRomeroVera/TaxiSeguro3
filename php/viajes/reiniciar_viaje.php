<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql="UPDATE viajes 
	  SET chofer_id = null, estado_viaje_id = 'En espera'
	  WHERE id = '".$id."';";
$result = mysqli_query($con, $sql);
if ($result) {

}else{
	echo "Error";
}


//Cierro
mysqli_close($con);

?>