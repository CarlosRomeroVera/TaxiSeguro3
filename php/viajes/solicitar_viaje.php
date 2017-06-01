<?php
require ("../db_config.php");

sleep(5);

$id 				= $_POST['id'];
$pasajero_id 		= $_POST['pasajero_id'];
$estado_viaje_id 	= $_POST['estado_viaje_id'];
$viaje_inicio 		= $_POST['viaje_inicio'];
$viaje_fin 			= $_POST['viaje_fin'];
$tarifa_id 			= $_POST['tarifa_id'];
$monto_final 		= $_POST['monto_final'];

$sql = "SELECT id FROM personas where user_id ='".$pasajero_id."';";

$result = mysqli_query($con, $sql);
$total = mysqli_num_rows($result);
if ($total>0) {
	$row=mysqli_fetch_row($result);
    $sql = "SELECT id FROM pasajero where persona_id ='".$row[0]."';";
    $result = mysqli_query($con, $sql);
	$total = mysqli_num_rows($result);
	if ($total>0) {
		$row=mysqli_fetch_row($result);
	    $sql="INSERT INTO viajes (id, pasajero_id, estado_viaje_id, viaje_inicio, viaje_fin, tarifa_id, monto_final) VALUES ('".$id."', '".$row[0]."', '".$estado_viaje_id."', '".$viaje_inicio."', '".$viaje_fin."', '".$tarifa_id."', '".$monto_final."')";
		$result = mysqli_query($con, $sql);

		if ($result) {
			//echo "true";
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