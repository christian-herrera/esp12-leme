import debug from './debug/debug.js';
import { saveInFile, isIdEnabled } from './db/db_helper.js';
import { createSocket } from 'node:dgram';

const server = createSocket('udp4');

// Exit si no se definen las variables de entorno
if (!process.env.PORT || !process.env.HOST) {
    debug.error(`Debe definir las variables de entorno PORT y HOST`);
    process.exit(1);
}



server.on('error', (err) => {
    debug.error(err.stack);
    server.close();
});


server.on('message', async (msg, rinfo) => {
    let msgStr = msg.toString();

    // Mensaje recibido
    debug.line();
    debug.info(`Mensaje recibido: ${msg}`);

    // Verificar que el mensaje inicie con '#' y termine con '&'
    if (msgStr.startsWith('#') && msgStr.endsWith('&')) {
        msgStr = msgStr.slice(1, -1);

        //const terms = msgStr.split('|');    //Serán strings
        const terms = msgStr.split('|').map(Number);


        if (terms.length !== 5) {
            debug.error(`El mensaje no tiene el formato esperado.`);
        } else {
            debug.ok(`Mensaje con formato correcto...`);
            
            debug.data('--------------------');
            debug.data(`ID: ${terms[0]}`);

            //debug.data(`TIME: ${terms[1]}`);
            const date = new Date(terms[1]);
            debug.data(`TIME: ${date.toLocaleDateString('es-AR')} ${date.toLocaleTimeString('es-AR')}`);
            
            debug.data(`VALOR1: ${terms[2]}`);
            debug.data(`VALOR2: ${terms[3]}`);
            debug.data(`VCC: ${terms[4]}`);
            debug.data('--------------------');

        
            switch (isIdEnabled(terms[0])) {
                case -2:
                    debug.error(`Error al leer el archivo id_enabled.json...`);
                    await sendACK('ERROR', rinfo.port, rinfo.address);
                    break;
                case -1:
                    debug.error(`ID: [${terms[0]}] no encontrado...`);
                    await sendACK('NOT_FOUND', rinfo.port, rinfo.address);
                    break;
                case 0:
                    debug.info(`ID: [${terms[0]}] deshabilitado...`);
                    await sendACK('NOT_ENABLED', rinfo.port, rinfo.address);
                    break;
                case 1:
                    debug.info(`ID: [${terms[0]}] habilitado...`);
                    await sendACK(msgStr, rinfo.port, rinfo.address);
                    saveInFile(terms);
                    break;
                default:
                    break;
            }
        }
    } else {
        debug.error(`Mensaje no tiene el formato esperado.`);
    }
    debug.line();

});


// Responce con el ACK cifrado
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

