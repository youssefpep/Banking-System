<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./View Customers Page/style.css" type="text/css" rel="stylesheet" />
    <link
      href="https://fonts.googleapis.com/css2?family=Georama:wght@500&family=Open+Sans:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>View Customers Page</title>
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
      <div class="grid-container">
        <div>Joseph H Concannon</div>
        <div>Terry J Luna</div>
        <div>Alvin P Childers</div>
        <div>Charles C Miller</div>
        <div>Michelle P Perrault</div>
        <div>Charlie P Varner</div>
        <div>Evelyn J Heckman</div>
        <div>Florence J Evans</div>
        <div>Max R Hulse</div>
        <div>Stanley M Williams</div>
      </div>
    </div>

    <div id="transferAmount">
      <form method=GET action=transfers.php>
        <label>From:</label>
        <input type=text name=transferFrom> <br />
        <label>To:</label>
        <input type=text name=transferTo> <br />
        <input id=save type=submit  value='Start Transfer'/>
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