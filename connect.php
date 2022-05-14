<?php 
  define('DBUSER', 'transferSystem'); 
  define('DB_PASSWORD', ' {oe_^LB)Pr4jr-}I'); 
  define('DB_HOST', 'localhost'); 
  define('DB_NAME', 'id18915405_bankingsystem'); 

  //Making the Connection
  $conn = @mysqli_connect(DB_HOST, DBUSER, DB_PASSWORD, DB_NAME) OR die ('Could not connect to the dataase'.mysqli_connect_error()); 

  //Setting the Encoding
  mysqli_set_charset($conn, 'utf8'); 
?>