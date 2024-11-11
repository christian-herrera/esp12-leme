import { createSocket } from 'dgram';
const client = createSocket('udp4');


const numRequests = process.env.NUM_REQUESTS || 1000;
const ms_delay = process.env.DELAY || 10;
let counter = 1;

function sendMessage(msg){
    return new Promise((resolve, reject) => {
        client.send(msg, process.env.PORT, process.env.URL, (err) => {
            if (err) {
                console.log(`Error al enviar mensaje: ${err}`);
                client.close();
                reject(err);
            } else {
                console.log(`Mensaje enviado: ${msg}`);
                resolve();
            }
        });
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function send(){
    for(counter = 1; counter <= numRequests; counter++) {
        await sendMessage(`Valor ${counter}`);
        await delay(ms_delay);
    }

    await delay(100);
    await sendMessage(`LIMPIAR`);
    client.close();
}

send();






