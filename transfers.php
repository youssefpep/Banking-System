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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./Transfer Page/style.css" type="text/css" rel="stylesheet" />
    <link
      href="https://fonts.googleapis.com/css2?family=Georama:wght@500&family=Open+Sans:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>Transfer Page</title>
  </head>
  <body>
    <header>
      <div class="nav-bar">
        <h3 class="logo-title">E BANKER</h3>
        <nav class="links">
          <a href="./home.php">Home</a>
          <a href="./viewCustomers.php">View Customers</a>
          <a href="./transfers.php">About Me</a>
        </nav>
      </div>
    </header>
    <div class="card">
      <div id="userPic">
        <img src="./Transfer Page/User Pic.png" />
      </div>
      <div class="grid-container">
        <div>NAME: <?php echo $myname;?></div>
        <div>EMAIL:<?php echo $Email;?></div>
        <div>ADDRESS:<?php echo $Address;?></div>
        <div>CURRENT BALANCE ($):<?php echo $Balance;?></div>
      </div>
    </div>

    <div id="transferAmount">
      <form method=GET action=page2.php >
        <label>Amount:</label>
        <input type="number" name='transferAmount'/>
        <input id="save" type="submit" value="TRANSFER" />
      </form>
    </div>

    <footer>
      <div class="footer">
        <i class="fa fa-copyright fa-sm"></i>
        &copy Copyright 2022 Sparks Foundation Internship | Designed by <a href="./about.php">Youssef Sherif
      </div>
    </footer>
  </body>
</html>



