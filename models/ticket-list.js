const Ticket = require('./ticket');

class TicketList {

    constructor(){
        this.ultimoNumero = 0;
        this.pendientes = [];    // No están siendo atendidos.
        this.asignados = [];     // Están siendo atendidos.
    }

    get siguienteNumero(){
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    // 3 que se verán en las tarjetas y 10 en el historial
    get ultimos13(){
        return this.asignados.slice(0,13)
    }

    crearTicket(){
        const nuevoTicket = new Ticket( this.siguienteNumero );
        this.pendientes.push( nuevoTicket );
        return nuevoTicket;
    }

    asignarTicket( agente, escritorio ){
        if( this.pendientes.length === 0){
            return null;
        }

        const siguienteTicket = this.pendientes.shift();   // De pendiente borra el primer elemento del arreglo
        
        siguienteTicket.agente = agente;                   // Damos valor a estas propiedades del ticket 
        siguienteTicket.escritorio= escritorio;

        this.asignados.unshift( siguienteTicket );         // Añade al principio de un arreglo un elemento    
    
        return siguienteTicket;
    }

}

module.exports = TicketList