/*********************************************** 
 * Inicializálás
************************************************/

const WebSocket = require('ws');
const ipc = require('node-ipc');

/*********************************************** 
 * WebSocket 
************************************************/

function verifyClient(info, cb) {
  var tempcookie = info.req.headers['cookie'];
  tempcookie = tempcookie.split (";");
  if (tempcookie[0].search("token") == -1)
  {
    console.log("Rossz bejelentkezés");
    cb(0);
  }else{
    console.log("Jó bejelentkezés");
    tempcookie[0].slice(6); 
    cb(1);
  }
/*  
  for (var i = 0;i < tempcookie.length; i++){
    if (tempcookie[i].search("token") == 1 ){

      console.log(tempcookie[i]);
    }*/
}

// WebSocket szerver létrehozása
const wss = new WebSocket.Server({port: 8080, verifyClient }); 

var tempdata; 
// WebSocket csatlakozás esetén

wss.on('connection', function connection(ws, req){
  console.log("connected yay");
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