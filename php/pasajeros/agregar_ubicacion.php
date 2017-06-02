<?php
require ("../db_config.php");

$id = $_POST["id"];
$tipo = $_POST["tipo"];
$lat = $_POST["lat"];
$lon = $_POST["lon"];
$coord = $lat.','.$lon;

$sql = "SELECT id FROM personas where user_id ='".$id."';";
$result = mysqli_query($con, $sql);
$total = mysqli_num_rows($result);
if ($total>0) {
	$row=mysqli_fetch_row($result);
    $sql = "SELECT id FROM pasajero where persona_id ='".$row[0]."';";
    $result = mysqli_query($con, $sql);
	$total = mysqli_num_rows($result);
	if ($total>0) {
		$row=mysqli_fetch_row($result);
		$sql = "UPDATE pasajero SET ".$tipo."='".$coord."' WHERE id ='".$row[0]."';";
		$result = mysqli_query($con, $sql);
		if ($result) {
			echo "Se guardo la ubicación de tu ".$tipo;
		}else{
			echo "No se pudo guardar la ubicación, intenta de nuevo";
		}
	}else{
		echo "No se encontró el id de persona en la tabla chofer, error del sistema";
	}
}else{
	echo "No se encontró el id de usuario en la tabla personas, error del sistema";
}
//$sql = "UPDATE pasajero SET ".$tipo."='".$coord."' WHERE id ='".$id."';";



	die;
?>