<?php
    // adatbázishoz 
    include("config.php");

    /****************************************
     * 
     *  Dolgok amik az admin.php-ben lesznek 
     *  majd egyszer
     * 
     ***************************************/

     if ($_SESSION['token'] == NULL)
     {
         echo ("Neked nem szabadna itt lenned");
     }else{
        echo '<script type ="text/javascript">
        var token = "' . $_SESSION["token"] . '" 
        </script>'
        ;
     }

    // ha a felhasználó bejelentkezne
    if($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        // kezeljük a bevitt adatokat
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $password = mysqli_real_escape_string($db, $_POST['password']);

        // lekérdezés
        $sql = "SELECT id FROM users WHERE username = '$username' and password = '$password'";
        $result = mysqli_query($db, $sql);
        
        // ha nincs eredmény
        if ($result == NULL)
        {
            echo "Nincs ilyen felhasználó";
        // ha van eredmény
        }else{
            // az eredmény tartalmát tömbbe
            $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    
            // megszámoljuk a lekérdezés sorait, ha több mint 1 sor van akkor hiba történt
            $count = mysqli_num_rows($result);
            if($count == 1) 
            {
                // cookie létrehozása
                session_start();

                // IPC-n továbbküldendő adatok összeállítása
                $tmpdata['token'] = sha1(strval(time()).$_POST['username'].strval(rand(0000000,9999999)));
                $tmpdata['group'] = "admin";

                $tmpjson['type'] = 'login';
                $tmpjson['data'] = $tmpdata;
                
                // IPC Unix socket létrehozása
                $socket = stream_socket_client("unix:///var/www/html/ipc.sock", $errno, $errstr, 30);
                // ha nincs socket
                if (!$socket)
                {
                    echo "Nem található socket. Hibaüezenet: $errstr ($errno)</br>\n";
                // ha van socket
                } else {
                    // az adatok JSON formátumban való továbbküldése
                    echo fwrite($socket, json_encode($tmpjson)."\f");
                    
                    var_dump (json_encode($tmpjson)."\f");

                    // socket lezárása
                    fclose($socket);

                    // redirect
                    //header("location: admin.php");
                }

            }else{
                echo "Nincs ilyen felhasználó";
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
