const ipc=require('node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'sock';
ipc.config.retry= 1500;
ipc.config.appspace = "whack.";

ipc.serve(
    function(){
        ipc.server.on(
            'whack.message',
            function(data,socket){
                ipc.server.emit(
                    socket,
                    'whack.message',
                    {
                        id      : ipc.config.id,
                        message : data.message+' world!'
                    }
                );
            }
        );
    }
);



ipc.server.start();