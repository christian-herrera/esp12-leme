import debug from './debug/debug.js';
import { createSocket } from 'node:dgram';

const server = createSocket('udp4');


if (!process.env.PORT || !process.env.HOST) {
    debug.error(`Debe definir las variables de entorno PORT y HOST`);
    process.exit(1);
}




server.on('error', (err) => {
    debug.error(err.stack);
    server.close();
});


server.on('message', async (msg, rinfo) => {

    // Mensaje recibido
    debug.line();
    debug.info(`Mensaje recibido: ${msg.toString()}`);

    // Verificar que el mensaje inicie con '#' y termine con '&'
    if (msg.toString().startsWith('#') && msg.toString().endsWith('&')) {
        msg = msg.toString().slice(1, -1);
        const terms = msg.split('|');

        if(terms.length !== 5) {
            debug.error(`El mensaje no tiene el formato esperado.`);
        } else {
            debug.ok(`Mensaje con formato correcto...`);
            await sendACK(msg, rinfo.port, rinfo.address);

            debug.data(`ID: ${terms[0]}`);
            debug.data(`TIME: ${terms[1]}`);
            debug.data(`VALOR1: ${terms[2]}`);
            debug.data(`VALOR2: ${terms[3]}`);
            debug.data(`VCC: ${terms[4]}`);
        }
    } else {
        debug.error(`Mensaje no tiene el formato esperado.`);
    }
    debug.line();

});



function sendACK(msg, port, address) {
    return new Promise((resolve, reject) => {
        server.send(`#ACK,${msg}&`, port, address, (err) => {
            if (err) {
                debug.error(`Error al enviar ACK...`);
                reject(err);
            } else {
                debug.ok(`ACK Enviado correctamente...`);
                resolve();
            }
        });
    });
}





// Server a la escucha...
debug.line();
server.bind(process.env.PORT, () => {
    debug.ok(`Servidor escuchando en ${process.env.HOST}:${process.env.PORT}`);
});

