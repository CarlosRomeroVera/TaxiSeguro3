<?php
require ("../db_config.php");

$zonaInicio = $_POST["zonaInicio"];
$zonaFinal = $_POST["zonaFinal"];

if ($zonaInicio == $zonaFinal) {
	echo "16";
	die;
}else{
	$sql = "SELECT monto,id FROM tarifas where zona_inicio ='".$zonaInicio."' AND zona_final ='".$zonaFinal."';";

	$result = mysqli_query($con, $sql);
	$total = mysqli_num_rows($result);
	if ($total>0) {
		$row=mysqli_fetch_row($result);
	    echo $row[0].','.$row[1];
	}else{
		//echo "nope";
		$sql = "SELECT monto,id FROM tarifas where zona_final ='".$zonaInicio."' AND zona_inicio ='".$zonaFinal."';";
		$result = mysqli_query($con, $sql);
		$total = mysqli_num_rows($result);
		if ($total>0) {
			$row=mysqli_fetch_row($result);
		    echo $row[0].','.$row[1];
		}else{
			echo "Zona no soportada";
		}
	}
	die;
}
?>