<?php
include './connect.php';

$myname = $_GET['transferTo'];
$fromName = $_GET['transferFrom'];
session_start();
$_SESSION['from'] = $fromName; 
$_SESSION['to'] = $myname; 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bankingsystem";


$result = $conn->query("SELECT * FROM banksystem WHERE Name LIKE '$myname'");
if (!$result) {
    echo 'Could not run query:';
    exit;
}
$row = mysqli_fetch_row($result);
$Email = $row[2];
$Address = $row[3];
$Balance = $row[4]; 
$conn->close();
?>