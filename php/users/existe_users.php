<?php
require ("../db_config.php");


//Nombro variables con metodo POST
$usuario = $_POST['nombre'];

 
      $sql = "SELECT * FROM users WHERE usuario = '$usuario'";
      $result = mysqli_query($con,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $count = mysqli_num_rows($result);
      if($count == 1){
        
         echo true;
      }
      else{
         echo false;
      }


mysqli_close($con);

?>