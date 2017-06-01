<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT pasajero_id FROM viajes where id ='".$id."'";
$result = mysqli_query($con, $sql);
if ($result) {
	$row=mysqli_fetch_row($result);
	$sql = "SELECT persona_id FROM pasajero where id ='".$row[0]."'";
	$result = mysqli_query($con, $sql);
	if ($result) {
		$row=mysqli_fetch_row($result);
		$sql = "SELECT nombre,apellido FROM personas where id ='".$row[0]."'";
		$result = mysqli_query($con, $sql);
		if ($result) {
			while($obj = mysqli_fetch_object($result)) {
				$var[] = $obj;
			}

			echo '{"persona":'.json_encode($var).'}';
		}else{
			echo 'Error';
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