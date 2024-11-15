import fs from 'node:fs';
import path from 'node:path';
import debug from '../debug/debug.js';

export function saveInFile(val) {
    const data = `${val[0]},${val[1]},${val[2]},${val[3]},${val[4]}`;
    const file = path.join(process.env.BASE_DIR || '', 'src', 'db', 'datos.txt');

    fs.appendFileSync(file, `${data}\n`, (err) => {
        if (err) {
            debug.error('Error al guardar en el archivo...');
            reject(err);
        } else {
            debug.ok('Guardado exitoso!');
            resolve();
        }
    });
}



/*
* Función que verifica si un ID está habilitado
* @param {string} id - ID a verificar
* @returns {number} -    1 si está habilitado, 
*                        0 si no lo está, 
*                       -1 si no se encuentra, 
*                       -2 si hay un error
*/
export function isIdEnabled(id) {
    try {
        const file = path.join(process.env.BASE_DIR || '', 'src', 'db', 'id_enabled.json');
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        const modulo = data.find(entry => entry.id === id);

        if(modulo === undefined) {
            //debug.error(`ID: ${id} - No encontrado en el archivo id_enabled.json`);
            return -1;
        }

        debug.info(`ID: [${modulo.id}] -> [${modulo.descripcion}]`);
        return modulo.enabled ? 1 : 0;

    } catch (err) {
        return -2;
    }
}




export default {
    saveInFile,
    isIdEnabled
};