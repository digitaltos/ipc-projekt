// jQuery kód futtatása, ha az oldal betöltött
$(document).ready(function(){
    // új WebSocket csatlakozás
    document.cookie = 'token = asdf123t; path=/' 
    var ws = new WebSocket('ws://192.168.0.150/ws');
 //   console.log('ws://'+ 'asdf1234:testtest' + '@192.168.0.150/ws');

  //  $("#debug").append("<br/>" + "token tartalma:" + token);

    // ha üzenet érkezik WebSocketen keresztül
    ws.onmessage = function(message) {
        if (message.data === "inc")
        {
            $('#count').html(parseInt($('#count').html(), 10)+1);
        }
    };

    $("#szamlalo").click(function(){
        ws.send("inc");
    });
});