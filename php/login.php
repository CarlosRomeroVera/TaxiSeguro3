<?php
include_once ("db_config.php");

   if($_SERVER["REQUEST_METHOD"] == 'POST'){
      // username and password sent from form 
      $username = mysqli_real_escape_string($con,$_POST['user']);
      $password = mysqli_real_escape_string($con,$_POST['pass']); 

      $sql = "SELECT * FROM users WHERE usuario = '$username';";

      $result = mysqli_query($con,$sql);
      $contra;
      while($obj = mysqli_fetch_object($result)){
         $var[] = $obj;
         $contra = $obj->contrasenia;
      }

      if (password_verify(@$password, @$contra)) {
         //echo '¡La contraseña es válida!';
         $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
         $count = mysqli_num_rows($result);
         
         if($count == 1){
            echo '{"user":'.json_encode($var).'}';
         }
         else{
            echo '{"user":[{"info": "Incorrecto"}]}';
         }
      } 
      else {
          echo '{"user":[{"info": "Incorrecto"}]}';
      }

   }

?>

