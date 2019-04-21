<?php
session_start();

if ($_SESSION['token'] == NULL)
{
    echo ("Nem bejelentkezett felhasználó");
}else{
   echo '<script type ="text/javascript">
   var token = "' . $_SESSION["token"] . '" 
   </script>'
   ;
}
?>

<!DOCTYPE html>
<html>
    <META charset="UTF-8" />
    <head>
        <title>Projekt oldal 2/2</title>
        <script src="./jquery-3.3.1.min.js"></script>
        <script src="./admin.js"></script>
    </head>

    <body>
    <h1>Projekt weboldal 2/2: admin felület</h1>
    <br>
    <HR/>
        <section id="debug">
    </body>
</html>
