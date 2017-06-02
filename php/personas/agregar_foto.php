<?php
require ("../db_config.php");


//NOTA: La imagen viene en Base 64 (porque así la enviamos desde consultar.html)
$user_id = $_POST['id'];
$img = $_POST['imagen'];
 

//$img = mysqli_escape_string($con, $img);
 
//Si el usuario no existe lo insertamos,
//y si ya existe lo actualizamos
$sql="UPDATE personas 
		SET foto = '".$img."'
		WHERE user_id = '".$user_id."';";

mysqli_query($con, $sql) 
    or mostrar_error("Error al ejecutar la consulta:\n$sql.\n\n".
                      mysqli_errno($con) . ": " . mysqli_error($con));
 
echo $sql;
//La respuesta en formato JSON...
$respuesta = array(
    'ok' => true
);
echo json_encode($respuesta);

mysqli_close($con);
// $return = Array('ok'=>TRUE);
// $upload_folder ='images';
// $nombre_archivo = $_FILES['fotoPersona']['name'];
// $tipo_archivo = $_FILES['fotoPersona']['type'];
// $tamano_archivo = $_FILES['fotoPersona']['size'];
// $tmp_archivo = $_FILES['fotoPersona']['tmp_name'];
// $archivador = $upload_folder . '/' . $nombre_archivo;
// if (!move_uploaded_file($tmp_archivo, $archivador)) {
// 	$return = Array('ok' => FALSE, 'msg' => "Ocurrio un error al subir el archivo. ".$nombre_archivo." No pudo guardarse.", 'status' => 'error');
// }	
// header('Content-Type: application/json');
// echo json_encode($return);

// $persona_id 	= $_POST['persona_id'];
// $persona_foto	= $_POST['persona_foto'];

//  $tmp=$_FILES['persona_foto']['tmp_name']; 
//     $fot="../www/img/pasajeros/".$_FILES['persona_foto']['name']; 
//     if (is_uploaded_file($tmp)) 
//     { 
//         move_uploaded_file($tmp,$fot); 
//         echo "Guardo"; 
//     }else 
//     { 
//         echo "No funco u.u.."; 
//     } 

// echo ($persona_foto);

//Añado la consulta
// $sql="UPDATE personas 
// 		SET nombre = '".$nombre."', apellido = '".$apellido."', fnacimiento = '".$nacimiento."', telefono = '".$telefono."', correo = '".$correo."', modified = NOW() 
// 		WHERE user_id = '".$user."';";
// echo $sql;


// $result = mysqli_query($con, $sql);

// //Cierro
// mysqli_close($con);

?>