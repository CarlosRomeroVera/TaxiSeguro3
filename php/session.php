<?php
   include('db_config.php');
   session_start();
   
   $user = $_SESSION['login_usuario'];
   
   $ses_sql = mysqli_query($con,"select usuario from users where usuario = '$user' ");
   
   $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);
   
   $login_session = $row['usuario'];
   
   if(!isset($_SESSION['login_usuario'])){
      header("location:login.php");
   }
?>