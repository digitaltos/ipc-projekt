/*********************************************** 
 * Inicializálás
************************************************/
// létrehoz egy WSServer változót a ws modulból (ez lesz a WebSocket szerver)
global.tokens = {};
global.groups = {};

const WebSocket = require('ws');
//var WSServer = require('ws').Server;
const ipc = require('node-ipc');

const wss = new WebSocket.Server({port: 8080}); 
var tempdata; 
// WebSocket csatlakozás esetén
wss.on('connection', function connection(ws){
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send("valaki csatlakozott");
      console.log(client);
    }
  });
});

ipc.config.id = 'sock';
ipc.config.socketRoot = "/var/www/html/";
ipc.config.appspace = "ipc.";
ipc.config.retry = 1000;
//ipc.config.rawBuffer = true;
//ipc.config.encoding='utf8';

ipc.serve(
  function(){
    ipc.server.on(
      'connect',
      function(socket){
        ipc.log('###Valami semmirekellő csatlakozott');
      }
    );

    ipc.server.on(
      'login',
      function(data){
        ipc.log('Szólott a PHP: ', data);
        tempdata = data;
        tempdata = JSON.parse(tempdata);
        global.tokens[tempdata.token] = tempdata.group;

        console.log(global.tokens);
      }
    );
  }
);

ipc.server.start();
