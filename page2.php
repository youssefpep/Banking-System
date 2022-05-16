<?php include './transactionsHistory_backend.php';?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./Transactions History Page/style.css" type="text/css" rel="stylesheet" />
    <link
      href="https://fonts.googleapis.com/css2?family=Georama:wght@500&family=Open+Sans:wght@300&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
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

    <table>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
      <?php 
      $sql = $conn->query("SELECT * FROM transferhistory");
      while ($row = mysqli_fetch_row($sql)){
        echo "<tr>";
        for ($j = 0; $j < 5; $j++){
          echo "<td>".$row[$j]."</td>";
        }
        echo "</tr>";
      }
      ?>
    </table>

    <footer>
      <div class="footer">
        &copy Copyright 2022 Sparks Foundation Internship | Designed by <a href="./about.php">Youssef Sherif
      </div>
    </footer>
  </body>
</html>



