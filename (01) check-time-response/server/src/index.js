// Parametros de configuracion
import 'dotenv/config';

// Modulo para datagramas UDP
import { createSocket } from 'node:dgram';
const server = createSocket('udp4');



server.on('error', (err) => {
    console.log(`ERROR:\n${err.stack}`);
    server.close();
});

let count_in = 0;
server.on('message', (msg, rinfo) => {
    count_in++;

    // Respuesta ACK
    // server.send(`ACK: ${msg}`, rinfo.port, rinfo.address, (err) => {
    //     if (err) {
    //         console.log(`Error al enviar mensaje al cliente: ${err}`);
    //     }
    //});

    if(msg == 'LIMPIAR'){
        console.log(`Contador: ${count_in - 1}`);
        console.log('Limpieza realizada!');
        count_in = 0;
    }
    
});

console.log(`---------------------------------------------------> NodeJs Iniciado...`)
server.bind(process.env.PORT, () => {
    console.log(`Servidor escuchando en ${process.env.HOST}:${process.env.PORT}`);
});

