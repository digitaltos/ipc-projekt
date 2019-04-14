// jQuery kód futtatása, ha az oldal betöltött
$(document).ready(function(){
    // új WebSocket csatlakozás
    document.cookie = 'token =' + token + '; path=/' 
    var ws = new WebSocket('ws://192.168.0.94/ws');

    // ha üzenet érkezik WebSocketen keresztül
    ws.onmessage = function(message) {
        if (message.data === "inc")
        {
            $('#debug').append("<br/>" + message.data);
        }
    };
});