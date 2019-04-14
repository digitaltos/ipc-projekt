/*********************************************** 
 * Inicializálás
************************************************/

const WebSocket = require('ws');
const ipc = require('node-ipc');

/*********************************************** 
 * WebSocket 
************************************************/

// WebSocket szerver létrehozása
const wss = new WebSocket.Server({port: 8080}); 

var tempdata; 
// WebSocket csatlakozás esetén

wss.on('connection', function connection(ws, req){
  console.log(req.headers);
});

// mindenkinek szól
/*wss.on('connection', function connection(ws){
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send("valaki csatlakozott");
      console.log(client);
    }
  });
});*/