import debug from './debug/debug.js';
import { createSocket } from 'dgram';


const client = createSocket('udp4');
let timer1 = null;

if (!process.env.PORT || !process.env.HOST) {
    debug.error(`Debe definir las variables de entorno PORT y HOST`);
    process.exit(1);
}


// Estructura pensada para el mensaje....
// Envío -> #ID|TIME_UNIX|VALOR1|VALOR2|VCC&
// ACK   -> #ACK,ID|TIME_UNIX|VALOR1|VALOR2|VCC&
const id = 123456;
const time = new Date().getTime();
const valor1 = (24 + Math.random() * 5).toFixed(2);
const valor2 = (60 + Math.random() * 30).toFixed(2);
const vcc = (Math.random() * 5).toFixed(2);
const msg = `#${id}|${time}|${valor1}|${valor2}|${vcc}&`;





// Recibe el ACK
client.on('message', (msg, rinfo) => {
    debug.info(`${msg.toString()}`);
    clearTimeout(timer1);
    client.close();
});


// Envia un paquete UDP

client.send(msg, process.env.PORT, process.env.HOST, (err) => {

    if (err) {
       debug.error(`Error al enviar mensaje: ${err}`);
    } else {
       debug.ok(`Mensaje enviado: ${msg}`);
    }

    timer1 = setTimeout(() => {
        client.close();
    }, 3000);
});





