// jQuery kód futtatása, ha az oldal betöltött
$(document).ready(function(){
    // új WebSocket csatlakozás
    var ws = new WebSocket('ws://192.168.0.94/ws');
    console.log(ws);
    // ha üzenet érkezik WebSocketen keresztül
    ws.onmessage = function(message) {
        // üzenet betöltése a HTML kódba
        $("#debug").append("<br/>" + message.data);
    };


    /*
*
* ideiglenes dolgok
*/

$("#debug").append("<br/>" + token);
});


