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


# check-time-response
Permite enviar una cantidad específica de paquetes para que el servidor muestre la cantidad de paquetes que llegaron. La idea es ver cuantos paquetes llegaron y cuantos se perdieron.


# unzip-message
Pruebas para recibir los paquetes en una trama específica y descomponerlos en variables independientes para luego procesarlas.


# unzip-and-save-message
Se agrega la funcionalidad de guardar en un archivo los valores que llegaron, siempre que se cumpla el formato específico de los paquetes


# encrypted-message
Permite cifrar el mensaje del paquete que se envía por UDP para que el server lo descifre, verifique los datos que llegaron, y finalmente el server devuelve el ACK también encriptado. El cliente recibe el ACK, lo descifra y lo muestra en consola.

## To-Do
- Agregar el try-catch para tratar el fallo del descifrado del mensaje.


# only-ids-enabled
Permite probar la funcionalidad de guardado de datos para aquellos ID que se encuentran en un archivo json cuya estructura es de la forma:
```json
[
    {
        "id": 111111,
        "descripcion": "Modulo ESP 1",
        "enabled": true
    }    
]
```
Y solo aquellos paquetes que coincidan con el ID y tengan la propiedad `enabled` en `true` serán almacenados.