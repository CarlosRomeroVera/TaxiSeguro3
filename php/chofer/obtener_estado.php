<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT id FROM personas where user_id ='".$id."';";

$result = mysqli_query($con, $sql);
$total = mysqli_num_rows($result);
if ($total>0) {
	$row=mysqli_fetch_row($result);
    $sql = "SELECT id,estado_chofer FROM chofer where persona_id ='".$row[0]."';";
    $result = mysqli_query($con, $sql);
	$total = mysqli_num_rows($result);
	if ($total>0) {
		$row=mysqli_fetch_row($result);
		if ($row[1] != null) {
			echo 'Estado: LIBRE';
		}else{
			echo 'Estado: DESCONECTADO';
		}
	}else{
		echo "No se encontró el id de persona en la tabla chofer";
	}
}else{
	echo "No se encontró el id de usuario en la tabla personas";
}

//Cierro
mysqli_close($con);

?>