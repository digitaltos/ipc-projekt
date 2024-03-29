/*********************************************** 
 * Inicializálás
************************************************/
// globális változók a felhasználók kezeléséhez
global.tokens = {};
var admin = [];
var normal = [];
global.groups = {admin, normal};

// objektumok a WebSockethez és az IPC-hez, modulból
const WebSocket = require('ws');
const ipc = require('node-ipc');

/*********************************************** 
 * WebSocket 
************************************************/

// kliens autentikálása (a függvény a kliens WS handshake kezdésekor hívódik)
function verifyClient(info, cb) {
  // HTTP header-ben cookieként érkező token kezelése
  var tempcookie = info.req.headers['cookie'];
  tempcookie = tempcookie.split (";");

  var temptoken;

  // a cookie tartalmát tömbbé parse-olja, temptoken tárolja majd a tokent
  tempcookie.forEach(function (curr, i) {
    curr = tempcookie[i].split ("=");
    curr[0] = curr[0].replace(/\s/g, '');
    if (curr[0] == "token"){
      temptoken = curr[1];
    }
  });

  // ha nem volt token, visszautasítja a kapcsolatot
  if (temptoken == null)
  {
    console.log("Rossz bejelentkezés");
    cb(0);
  // ha volt token, összehasonlítja az IPC-n keresztül kapottal 
  }else{
    for (const key in global.tokens) {
      if (temptoken === key) {
        cb(1);
        var good = 1;
        break;
      }
    }
    // ha nem volt IPC-n keresztül kapott token
    if (!good) {
      console.log("Rossz bejelentkezés");
      cb(0);
    }
  }
}

// WebSocket szerver létrehozása
const wss = new WebSocket.Server({port: 8080, verifyClient}); 

// WebSocket csatlakozás esetén
wss.on('connection', function connection(ws, req){
  // cookieből most a létrejött kapcsolathoz fűzi a groupot
  var tempcookie = req.headers['cookie'];
  tempcookie = tempcookie.split (";");

  var token;
  var group;

  tempcookie.forEach(function (curr, i) {
    curr = tempcookie[i].split ("=");
    curr[0] = curr[0].replace(/\s/g, '');
    if (curr[0] == "token"){
      token = curr[1];
    }
  });

  // beteszi a globális változóba a kliens WS kapcsolat objektumot
  for (const key in global.tokens) {
    if (token === key) {
      group = global.tokens[key];
      if (group === "admin"){
        global.groups.admin.push(ws);
      }else{
        global.groups.normal.push(ws);
      }
      break;
    }
  }

  // ha admin, szól minden másik admin usernek hogy csatlakozás volt
  if (group === "admin"){
    var arrayLength = global.groups.admin.length;
      for (var i = 0; i < arrayLength; i++){
        if (global.groups.admin[i] != null && ws != global.groups.admin[i] && global.groups.admin[i].readyState === WebSocket.OPEN) {
          global.groups.admin[i].send("Valaki csatlakozott!");
        }
      }
  };
  
  // ha lezárul a kapcsolat, akkor kitörli a globális változóból
  ws.on('close', function (){
    if (group === "admin"){
      var arrayLength = global.groups.admin.length;
      for (var i = 0; i < arrayLength; i++){
        if (ws == global.groups.admin[i]) {
          delete global.groups.admin[i];
          break;
        }
      }
      }else{
      var arrayLength = global.groups.normal.length;
      for (var i = 0; i < arrayLength; i++){
        if (ws == global.groups.normal[i]) {
          delete global.groups.normal[i];
          break;
        }
      }
    } 
  });

});

/*********************************************** 
 * IPC
************************************************/

// Unix socket beállításai
ipc.config.id = 'sock';
ipc.config.socketRoot = "/var/www/html/";
ipc.config.appspace = "ipc.";
ipc.config.retry = 1000;

// Unix socket szerver eventlistenerje
ipc.serve(
  function(){
    // ha üzenet érkezik a PHP-től
    ipc.server.on(
      'login',
      function(data){
        // adatok elmentése a globális változóba
        global.tokens[data.token] = data.group;
      }
    );
  }
);

// IPC szerver indítása
ipc.server.start();
