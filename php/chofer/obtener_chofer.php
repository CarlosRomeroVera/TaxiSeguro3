<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT chofer_id FROM viajes where id ='".$id."'";
$result = mysqli_query($con, $sql);
$row=mysqli_fetch_row($result);

if ($result && isset($row[0])) {
	//$row=mysqli_fetch_row($result);
	$sql = "SELECT persona_id FROM chofer where id ='".$row[0]."'";
	$result = mysqli_query($con, $sql);
	$row=mysqli_fetch_row($result);
	if ($result && isset($row[0])) {
		//$row=mysqli_fetch_row($result);
		$sql = "SELECT * FROM personas where id ='".$row[0]."'";
		//$persona_id = $row[0];
		$result = mysqli_query($con, $sql);
		//$row=mysqli_fetch_row($result);
		if ($result) {
			while($obj = mysqli_fetch_object($result)) {
				$var[] = $obj;
			}

			echo '{"chofer":'.json_encode($var).'}';
			
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