<?php
require ("../db_config.php");


//Nombro variables con metodo POST
$user_id = $_POST['user_id'];
$contrasenia 	= $_POST['contrasenia'];
//Añado la consulta
$sql="UPDATE users SET contrasenia = '".$contrasenia."', modified = NOW() WHERE id = '".$user_id."';";
echo $sql;
$result = mysqli_query($con, $sql);


mysqli_close($con);

?>