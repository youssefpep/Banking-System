<?php 
  //Making the Connection
  $conn = @mysqli_connect("localhost","root","","bankingsystem") OR die ('Could not connect to the dataase'.mysqli_connect_error()); 

  //Setting the Encoding
  mysqli_set_charset($conn, 'utf8'); 
?>