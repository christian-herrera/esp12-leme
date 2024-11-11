<h1 align="center">ESP12 - QNAP<br/><br/>
<div align="center">
<img src="docs/leme.png" style="max-width: 100%" width=200><br/><br/>


![GitHub last commit](https://img.shields.io/github/last-commit/christian-herrera/esp12-leme)
![Static Badge](https://img.shields.io/badge/version-v1.0.0-blue)


![GitHub License](https://img.shields.io/github/license/christian-herrera/esp12-leme?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/Espressif-0C2E82?style=for-the-badge&logo=Espressif&logoColor=#E7352C&logoSize=auto)
![Static Badge](https://img.shields.io/badge/-0C2E82?style=for-the-badge&logo=QNAP&logoColor=white&logoSize=auto)
![Static Badge](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&style=for-the-badge&logoColor=white)


</div></h1>


# Descripción
Es un proyecto de servidor Node.js que recibe y guarda datos enviados por diversos dispositivos a través del protocolo UDP y hace que esos datos estén disponibles en tiempo real a través de conexiones TCP/IP. Es apto para sistemas de monitoreo o aplicaciones IoT donde los datos pueden ser almacenados y visualizados de manera fácil y eficiente.

# Características
- **Servidor UDP para recepción de datos**: Escucha y procesa los paquetes UDP enviados a través de múltiples dispositivos.

- **Archivo de Datos por Dispositivo**: La información se almacena en archivos de texto construidos por ID, lo que facilita su acceso y mantenimiento.

- **Acceso TCP en Tiempo Real**: Un dispositivo externo puede conectarse al servidor a través de TCP para acceder continuamente a salidas informativas de ese dispositivo.