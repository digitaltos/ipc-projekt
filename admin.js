// jQuery kód futtatása, ha az oldal betöltött
$(document).ready(function(){
    // új WebSocket csatlakozás
    var ws = new WebSocket('ws://192.168.0.94/ws');
    console.log(ws);

    $("#debug").append("<br/>" + "token tartalma:" + token);

    // ha üzenet érkezik WebSocketen keresztül
    ws.onmessage = function(message) {
        // üzenet betöltése a HTML kódba
       
    };

    $("#szamlalo").click(function(){
        var number = $('#count').text();
        $('#count').text(number + 1);
    });

});