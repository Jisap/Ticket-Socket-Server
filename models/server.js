// Servidor de Express
const express = require('express');     //Requerimos los modulos de express
const http = require('http');           //Requerimos los modulos http
const socketio = require('socket.io');  //requerimos los modulos de socket.io
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');           //npm i cors

class Server{
    
    constructor(){
        this.app = express();                           // Definimos el servidor express
        this.port = process.env.PORT;                   // Definimos el puerto de trabajo

        //http server
        this.server = http.createServer( this.app );    // Asignamos al servidor express el protocolo http y lo llamamos server

        //Configuración de socket server
        this.io = socketio( this.server,{ cors: {                   // Asignamos al server los paquetes de socket.io y lo llamamos io
                                            origin: "*",            // Añadimos también la configuración del cors    
                                            method: ["GET","POST"]
        }} ); 
        //Inicializar sockets
        this.sockets = new Sockets( this.io );          // Instanciamos la clase sockets en una variable llamada igual 
                                                        // Sockets contiene ticket-list y este todos los métodos de manejo de tickets
    }

    middlewares(){
        //Desplegar el directorio público
        this.app.use( express.static(path.resolve( __dirname, '../public' )));

        //CORS
        this.app.use( cors() );

        //GET de los últimos tickets
        this.app.get('/ultimos', (req, res) => {                        // Cuando se haga una petición a /ultimos
            res.json({                                                  // el server dará como respuesta los últimos 13 tickets del arreglo
                ok:true,                                                // De esta manera cuando se habrá una nueva pantalla de colas
                ultimos: this.sockets.ticketList.ultimos13              // recargará automaticamente los últimos 13 tickets
            });
        });
    }

    // configurarSockets(){
    //     new Sockets(this.io);
    // }

    execute(){

        //Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        //this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
        console.log( 'Server corriendo en puerto: ',this.port );
        });
    }
}

module.exports = Server;