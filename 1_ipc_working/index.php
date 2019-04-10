<?php
    include("config.php");
    session_start();
    //echo random_int(00000,99999);

    //echo "<pre>";
    //print_r(stream_get_transports());
    //echo "</pre>";
    $i = 0;
    var_dump($_SESSION);
   $socket = stream_socket_server("unix:///var/www/html/whack.sock", $errno, $errstr);
   if (!$socket) {
        echo "No socket yet... $errstr ($errno)</br>\n";
    } else {
/*        while ($conn = stream_socket_accept($socket)) {
            fwrite($conn, 'everybody gangsta till the php starts talkin');
            fclose($conn);*/
            echo ("fuck off");
          while ($conn = stream_socket_accept($socket)){
            echo "here";
            echo fread($socket, 1024);
            fclose($conn);
            fclose($socket);
            // $i++;
            //$_SESSION['something' . $i] = fgets($socket, 1024);
          }
        }



    //ha a felhasználó bejelentkezne
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $password = mysqli_real_escape_string($db, $_POST['password']);

        $sql = "SELECT id FROM users WHERE username = '$username' and password = '$password'";
        $result = mysqli_query($db, $sql);

        if ($result == false)
        {
            echo "Nincs ilyen felhasználó jógyerek";
        }else{
            $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
            $active = $row['active'];

            $count = mysqli_num_rows($result);

            if($count == 1)
            {
                header("location: gecc.php");
            }
        }


    }
?>

<!DOCTYPE html>
<html>
    <META charset="UTF-8" />
    <head>
        <title>Projekt oldal 1/2</title>
        <script src="./jquery-3.3.1.min.js"></script>
        <script src="./index.js"></script>
    </head>

    <body style="background-color:black; color: white">
    <h1>Projekt weboldal 1/2: bejelentkezés</h1>
    <br>
    <form method="post">
        <label>Név: </label><input type="text" name="username"><br>
        <label>Jelszó: </label><input type="password" name="password">
        <input type="submit" value="bejelentkezés">
    </form>
    <HR/>
        <H2>DEBUG</H2>
        <section id="debug">
    </body>
</html>
