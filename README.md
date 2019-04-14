# ipc-projekt
2019/01 projekt 2 tantárgy

============
2019-04-10 
============

A PHP-ből annyi hiányzik, hogy legyen group (a DB-ben legyen group először, aztán azt fetcheljük és küldjük tova NodeJS-nek)

Admin oldalon JS már tudja a tokent, azt tovább kell majd küldetni WS-en a Nodenak. 

- DB-ben adni group oszlopot, ez normal meg admin lehet
- PHP-ben megcsinálni a db-ből group lekérést, azt sessionbe rakni, IPC-n átküld nodenak

- Node kap tokent klienstől
- Tokent összenézi a tokens objektummal.
- Ha van match, akkor a helyes groupba a WS kliens objektumot 
- Ha csatlakozik valaki más WS-en, node megnézi a group objektumot, az eddig bejelentkezetteknek kiabál hogy mizu

Remélem van valami "this" szerű dolog JS-ben és akkor simán bele tudom rakatni a global objektumba a klienset oszt csókolom. 
