/***********************************************
 * Inicializálás
************************************************/
// létrehoz egy WSServer változót a ws modulból (ez lesz a WebSocket szerver)
//var WSServer = require('ws').Server;
const ipc = require('node-ipc');

console.log("test");

//var wss = new WSServer({port: 8080});

// WebSocket csatlakozás esetén
/*wss.on('connection', function connection(ws){
      ws.send("sup my nibbarinno");
});
*/

ipc.config.id = 'node_client';
ipc.config.socketRoot = "/var/www/html/";
ipc.config.appspace = "whack.";
ipc.config.retry = 1000;
//ipc.config.rawBuffer = true;
//ipc.config.encoding='utf8';

ipc.connectTo(
  'sock',
  function(){
    ipc.of.sock.on(
      'connect',
      function(){
        ipc.of.sock.emit(
          'whack.message',
          {
            id : ipc.config.id,
            message: 'fuck you'
          }
        );
      }
    );
    ipc.of.sock.on(
      'data',
      function(data){
        ipc.log('___Message received: ', data,data.toString());
      }
    );

    console.log(ipc.of.sock.destroy, "then die...");
  }
);
