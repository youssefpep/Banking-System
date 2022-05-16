<?php
$amount = $_GET['transferAmount'];
session_start();
$fromName = $_SESSION['from']; 
$toName = $_SESSION['to']; 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bankingsystem";
$accepted = 'Accepted'; 
$rejected = 'Rejected'; 
$conn = new mysqli($servername, $username, '', $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query("SELECT * FROM banksystem WHERE Name LIKE '$fromName'");
$row = mysqli_fetch_row($result);
$Balance = $row[4];
$result2 = $conn->query("SELECT * FROM banksystem WHERE Name LIKE '$toName'");
$row2 = mysqli_fetch_row($result2);
$Balance2 = $row2[4];
if ($Balance >= $amount){
  $sql = $conn-> prepare("INSERT INTO `transferhistory` (`fromName`, `toName`, `Amount`, `Status`) VALUES ('$fromName', '$toName', '$amount','$accepted')"); 
  $sql -> execute();
  $sql -> close();
  $Balance = $Balance - $amount;  
  $Balance2 = $Balance2 + $amount; 
  $sql = "UPDATE banksystem SET `Balance`='$Balance2' WHERE `Name`='$toName'";
  if ($conn->query($sql) === TRUE) {
    $m1= "Record updated successfully";
  } else {
    $m2= "Error updating record: " . $conn->error;
  }
  $sql = "UPDATE banksystem SET `Balance`='$Balance' WHERE `Name`='$fromName'";
  if ($conn->query($sql) === TRUE) {
    $m1= "Record updated successfully";
  } else {
    $m2= "Error updating record: " . $conn->error;
  }
}else{
  $sql = $conn-> prepare("INSERT INTO `transferhistory` (`fromName`, `toName`, `Amount`, `Status`) VALUES ('$fromName', '$toName', '$amount','$rejected')"); 
  $sql -> execute();
  $sql -> close();
  
}
?>