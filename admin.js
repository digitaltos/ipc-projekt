// jQuery kód futtatása, ha az oldal betöltött
$(document).ready(function(){
    // token küldése a kliensnek cookie-n keresztül
    document.cookie = 'token =' + token + '; path=/' 
    // új WebSocket csatlakozás
    var ws = new WebSocket('ws://192.168.0.94/ws');

    // ha üzenet érkezik WebSocketen keresztül
    ws.onmessage = function(message) {
        $('#debug').append("<br/>" + message.data);
    };
});