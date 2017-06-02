<?php
require ("../db_config.php");

//sleep(5);

$id = $_POST['id'];

$sql = "SELECT chofer_id FROM viajes where id ='".$id."'";
$result = mysqli_query($con, $sql);
$row=mysqli_fetch_row($result);
if ($result && isset($row[0])) {
	$sql = "SELECT coor_actuales FROM chofer where id ='".$row[0]."'";
	$result = mysqli_query($con, $sql);
	$row=mysqli_fetch_row($result);
	if ($result && isset($row[0])) {
		echo $row[0];
	}else{
		echo "Error";
	}
}else{
	echo "Error";
}

//Cierro
mysqli_close($con);

?>