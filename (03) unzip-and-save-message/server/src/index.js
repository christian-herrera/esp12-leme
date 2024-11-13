import debug from './debug/debug.js';
import fs from 'node:fs';
import path from 'node:path';
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
            await sendACK(msg, rinfo.port, rinfo.address);  //ACK
            await saveInFile(terms);  //Guarda en archivo

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


function saveInFile(val) {
    return new Promise((resolve, reject) => {
        const data = `${val[0]},${val[1]},${val[2]},${val[3]},${val[4]}`;
        const file = path.join(process.env.BASE_DIR || '', 'src', 'db', 'datos.txt');

        fs.appendFile(file, `${data}\n`, (err) => {
            if (err) {
                debug.error('Error al guardar en el archivo...');
                reject(err);
            } else {
                debug.ok('Guardado exitoso!');
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

