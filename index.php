<?php
    include("config.php");

    //ha a felhasználó bejelentkezne
    if($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $password = mysqli_real_escape_string($db, $_POST['password']);

        $sql = "SELECT id FROM users WHERE username = '$username' and password = '$password'";
        $result = mysqli_query($db, $sql);
        
        if ($result == NULL)
        {
            echo "Nincs ilyen felhasználó jógyerek";
        }else{
            $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    
            $count = mysqli_num_rows($result);
    
            if($count == 1) 
            {
                session_start();

                $tmpdata['token'] = random_int(10000,99999);
                $tmpdata['user'] = $username;

                $tmpjson['type'] = 'login';
                $tmpjson['data'] = $tmpdata;
                
                $socket = stream_socket_client("unix:///var/www/html/ipc.sock", $errno, $errstr, 30);
                if (!$socket)
                {
                    echo "Nem található socket. Hibaüezenet: $errstr ($errno)</br>\n";
                } else {
                    echo fwrite($socket, json_encode($tmpjson)."\f");
                    
                    var_dump (json_encode($tmpjson)."\f");
                    fclose($socket);
                    //header("location: admin.php");
                }

            }else{
                echo "Nincs ilyen felhasználó jógyerek";
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
