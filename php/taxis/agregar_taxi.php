<?php
require ("../db_config.php");

$id 		= $_POST['taxi_id'];
$numtaxi 	= $_POST['numtaxi'];
$placas 	= $_POST['placas'];
$modelo 	= $_POST['modelo'];
$anio 		= $_POST['anio'];


//Añado la consulta
$sql="INSERT INTO taxis (id, num_taxi, placas, modelo, anio) VALUES ('".$id."', '".$numtaxi."', '".$placas."', '".$modelo."', '".$anio."')";
//echo $sql;
$result = mysqli_query($con, $sql);


/*$sql=	"INSERT INTO alumnos (id, nacimiento, persona_id, escuela_id, grado_id, nivel_id) 
		VALUES ('".$alumno_id."', '".$nacimiento."', '".$persona_id."', '".$escuela_id."', '".$grado_id."', '".$nivel_id."');";
echo $sql;
$result = mysqli_query($con, $sql);*/

//Cierro
mysqli_close($con);

?>