<?php
session_start();

if ($_SESSION['token'] == NULL)
{
    echo ("Neked nem szabadna itt lenned");
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

    <body style="background-color:black; color: white">
    <h1 style="color:yellow">Projekt weboldal 2/2: admin felület</h1>
    <br>
    <HR/>
        <section id="debug">
    </body>
</html>
