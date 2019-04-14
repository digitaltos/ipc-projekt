/*********************************************** 
 * Inicializálás
************************************************/
// globális változók a felhasználók kezeléséhez
global.tokens = {};
global.groups = {};

// objektumok a WebSockethez és az IPC-hez, modulból
const WebSocket = require('ws');
const ipc = require('node-ipc');

/*********************************************** 
 * WebSocket 
************************************************/

function verifyClient(info, cb) {
  var tempcookie = info.req.headers['cookie'];
  tempcookie = tempcookie.split (";");

  var temptoken;
  tempcookie.forEach(function (curr, i) {
    curr = tempcookie[i].split ("=");
    curr[0] = curr[0].replace(/\s/g, '');
    if (curr[0] == "token"){
      temptoken = curr[1];
    }
  });

  if (temptoken == null)
  {
    console.log("Rossz bejelentkezés");
    cb(0);
  }else{
    console.log("Jó bejelentkezés");
    console.log(temptoken);
    cb(1);
  }
}

// WebSocket szerver létrehozása
const wss = new WebSocket.Server({port: 8080, verifyClient}); 

var tempdata; 
// WebSocket csatlakozás esetén

wss.on('connection', function connection(ws){
  console.log("whack");
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



/*********************************************** 
 * IPC
************************************************/

// Unix socket beállításai
ipc.config.id = 'sock';
ipc.config.socketRoot = "/var/www/html/";
ipc.config.appspace = "ipc.";
ipc.config.retry = 1000;

// Unix socket szerver eventlistenerjei
ipc.serve(
  function(){
    // csatlakozás esetén
    ipc.server.on(
      'connect',
      function(socket){
        ipc.log('###Valaki csatlakozott');
      }
    );

    // ha üzenet érkezik a PHP-től
    ipc.server.on(
      'login',
      function(data){
        ipc.log('Szólott a PHP: ', data);
        // adatok elmentése a globális változóba
        global.tokens[data.token] = data.group;

        console.log(global.tokens);
      }
    );
  }
);

// IPC szerver indítása
ipc.server.start();
