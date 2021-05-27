

class Sockets{

    constructor( io ){

        this.io = io;
        this.socketEvents();
        
    }

    socketEvents(){

    //On connection          
    this.io.on('connection', ( socket ) => {                            // Cuando un cliente se conecta se crea un socket y este lleva asociado un id
        
        //Mensaje de bienvenida
        socket.emit('mensaje-bienvenida', {                             // Al conectarse le enviaremos/emitiremos un evento 'mensaje-bienvenida'
            msg: 'Bienvenido al server',                                // con su data {msg:'Bienvenido al server', fecha: new Date()}
            fecha: new Date()
        });

        //Escuchar evento: mensaje-to-server
        socket.on('mensaje-to-server', ( data ) => {
        console.log( data );
        this.io.emit('mensaje-from-server', data );                     // Para emitir un evento al todos los posibles clientes/sockets usamos io
    })

});    



    }
}

module.exports = Sockets;