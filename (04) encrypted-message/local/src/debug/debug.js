import colors from 'colors';


function info(message) {
    console.log(`[${colors.blue.bold('INFO')}]  ${message}`);
}

function error(message) {
    console.log(`[${colors.red.bold('ERROR')}] ${message}`);
}

function ok(message) {
    console.log(`[${colors.green.bold(' OK ')}]  ${message}`);
}



function data(message){
    console.log(`[${colors.italic.magenta('DATA')}] ${message}`);
}


function plain(message) {
    console.log(`[${colors.gray('DEBUG')}] ${message}`);
}


function line(){
    console.log('-'.repeat(80));
}


export default { info, error, ok, data, plain, line };