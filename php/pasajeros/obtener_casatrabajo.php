<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT id FROM personas where user_id ='".$id."'";
$result = mysqli_query($con, $sql);
$row=mysqli_fetch_row($result);

if ($result && isset($row[0])) {
	$sql = "SELECT * FROM pasajero where persona_id ='".$row[0]."'";
	$result = mysqli_query($con, $sql);
	if ($result) {
		$var = [];
		while($obj = mysqli_fetch_object($result)) {
			$var[] = $obj;
		}

		echo '{"pasajero":'.json_encode($var).'}';
		
	}else{
		echo "Error";
	}
}else{
	echo "Error";
}

//Cierro
mysqli_close($con);

?>