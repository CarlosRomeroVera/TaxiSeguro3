<?php
require ("../db_config.php");


//Nombro variables con metodo POST
$id 				= $_POST['id'];
$chofer_id	 		= $_POST['chofer_id'];
$estado_viaje_id	= $_POST['estado_viaje_id'];

//Añado la consulta
$sql="UPDATE viajes 
	  SET chofer_id = '".$chofer_id."', estado_viaje_id = '".$estado_viaje_id."'
	  WHERE id = '".$id."';";
//echo $sql;
$result = mysqli_query($con, $sql);
if ($result) {
	$var = [];
	$sql = "SELECT * FROM viajes where id ='".$id."'";
	$result = mysqli_query($con, $sql);
	while($obj = mysqli_fetch_object($result)) {
		$var[] = $obj;
	}

	echo '{"viaje":'.json_encode($var).'}';
	//echo "Chofer asignado, esperando respuesta...";
}else{
	echo "Error";
}

mysqli_close($con);

?>