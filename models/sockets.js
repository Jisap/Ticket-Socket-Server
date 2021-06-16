const TicketList = require("./ticket-list");


class Sockets{

    constructor( io ){

        this.io = io;
        this.ticketList = new TicketList();
        this.socketEvents();
        
    }

    socketEvents(){

    //On connection          
    this.io.on('connection', ( socket ) => {                            // Cuando un cliente se conecta se crea un socket y este lleva asociado un id
        
        console.log('Cliente conectado');
                            
        socket.on('solicitar-ticket', (data, callback) => {             //data que recibimos//CB que mandamos ejecutar en el frontend
            const nuevoTicket = this.ticketList.crearTicket();
            callback( nuevoTicket )
        });

        socket.on( 'siguiente-ticket-trabajar', (usuario, callback) => {
            const { agente, escritorio } = usuario;
            const suTicket = this.ticketList.asignarTicket( agente, escritorio );
            callback( suTicket )

            this.io.emit('ticket-asignado', this.ticketList.ultimos13);
        })
    })      
    }
}

module.exports = Sockets;