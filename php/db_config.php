<?php

/*
//CONEXIÓN PARA SERVER DE PRUEBA

	$mysql_db_hostname = "localhost";
	$mysql_db_user = "root";
	$mysql_db_password = "itesm";
	$mysql_db_database = "idea";

	$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);

	if (!$con) {
	 trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
	}

*/

//CONEXIÓN PARA SERVER DE PRODUCCIÓN
	$mysql_db_hostname = "localhost";
	$mysql_db_user = "root";
	$mysql_db_password = "";
	$mysql_db_database = "taxiseguro";

	$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database) or die('error');

	mysqli_set_charset($con,"utf8");

	if (!$con) {
	 trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
	}

?>