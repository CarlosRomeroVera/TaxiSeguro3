<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];
$coor_actuales = $_POST['coor_actuales'];

$sql = "SELECT id FROM personas where user_id ='".$id."';";

$result = mysqli_query($con, $sql);
$total = mysqli_num_rows($result);
if ($total>0) {
	$row=mysqli_fetch_row($result);
    $sql = "SELECT id FROM chofer where persona_id ='".$row[0]."';";
    $result = mysqli_query($con, $sql);
	$total = mysqli_num_rows($result);
	if ($total>0) {
		$row=mysqli_fetch_row($result);
		$sql="UPDATE chofer 
			  SET coor_actuales = '".$coor_actuales."'
			  WHERE id = '".$row[0]."';";
		$result = mysqli_query($con, $sql);
		if ($result) {
			$sql = "SELECT id,estado_viaje_id FROM viajes where chofer_id ='".$row[0]."' AND estado_viaje_id = 'Asignado';";
			$result = mysqli_query($con, $sql);
			$total = mysqli_num_rows($result);
			if ($total>0) {
				$row=mysqli_fetch_row($result);
				echo $row[0];
			}else{
				echo "Error";
			}
			//echo 'Coordenadas synchronizadas';
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