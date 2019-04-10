const ipc=require('node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'clisock';
ipc.config.retry = 1000;
ipc.config.appspace = "whack.";

ipc.connectTo(
    'sock',
    function(){
        ipc.of.sock.on(
            'connect',
            function(){
                ipc.log('## connected to world ##', ipc.config.delay);
                ipc.of.sock.emit(
                    'whack.message',
                    {
                        id      : ipc.config.id,
                        message : 'hello'
                    }
                );
            }
        );
        ipc.of.sock.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world');
            }
        );
        ipc.of.sock.on(
            'whack.message',
            function(data){
                ipc.log('got a message from world : ', data);
            }
        );

        console.log(ipc.of.sock.destroy);
    }
);